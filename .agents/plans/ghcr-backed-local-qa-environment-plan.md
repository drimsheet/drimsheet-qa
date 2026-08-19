# GHCR-Backed Local QA Environment Implementation Plan

## Goal

Provide QA engineers with a reproducible, source-free local Drimsheet environment. A QA engineer clones only `drimsheet-qa`, authenticates to GitHub Container Registry (GHCR) with package-read access, pulls immutable application images, and starts PostgreSQL, Redis, RabbitMQ, `drimsheet-core`, and `drimsheet-web` with one Docker Compose command.

The initial implementation is ready to begin with the decisions in this plan: private GHCR packages under the `drimsheet` organization, repository-owned image builds, digest-pinned images in the QA repository, official infrastructure images, and a QA-owned Compose manifest. Organization administrators must complete the access preconditions before end-to-end verification can pass.

This plan does not make the existing Playwright suite target the local HTTP stack. The committed guard in `config/environment.ts` currently requires an environment-owner-approved HTTPS hostname, and the repository rules require execution against the separate live QA environment. Enabling local Playwright execution requires a separately approved safety design.

## Context

QA engineers will not clone `drimsheet-core`, `drimsheet-web`, or `drimsheet-platforms`. Consequently, the QA Compose manifest cannot use sibling `build:` contexts or bind-mount initialization files from those repositories. Application repositories must publish deployable images, while `drimsheet-qa` owns only their composition and the tested image manifest.

`drimsheet-platforms/docker-compose.yml` is the current infrastructure precedent and defines PostgreSQL, Redis, and RabbitMQ. For the current core-and-web QA environment, the extra PostgreSQL and RabbitMQ users created by its bind-mounted scripts are unnecessary: the official PostgreSQL owner can run core migrations, and the RabbitMQ default user can be the core user. Custom platform images remain out of scope until another current service requires those initialization contracts.

### Target Ownership

| Repository | Owned changes |
| --- | --- |
| `drimsheet-core` | Production Dockerfile, Docker ignore file, image build verification, and GHCR publication workflow for `ghcr.io/drimsheet/drimsheet-core` |
| `drimsheet-web` | Production Dockerfile, static-server/reverse-proxy configuration, Docker ignore file, image build verification, and GHCR publication workflow for `ghcr.io/drimsheet/drimsheet-web` |
| `drimsheet-qa` | Pull-only Compose manifest, digest lock manifest, non-secret environment example, operator documentation, and Compose contract checks |
| `drimsheet-platforms` | No initial code change; its versions and health-check patterns remain infrastructure precedent |

### Target Runtime Topology

```text
QA browser
    |
    v
drimsheet-web :8080
    |-- static SPA assets
    `-- /api/* --> drimsheet-core:3001
                         |-- postgres:5432
                         |-- redis:6379
                         `-- rabbitmq:5672

core-migrate (one shot) --> postgres:5432
```

The browser uses one origin. The web image is built with an empty `VITE_API_URL`, causing current API requests to use `/api/v1`; its static server proxies `/api/*` to `drimsheet-core`. This avoids embedding a machine-specific API hostname in the image and allows the same image digest to move between compatible environments that provide the same-origin routing contract.

## Acceptance Basis

* **Owning request:** QA engineers must be able to start the platform and QA-required applications through Docker without cloning the application or platform repositories.
* **Registry decision:** Use GHCR as the private container registry.
* **Repository rule:** Preserve the deployed-QA-only Playwright hostname boundary in `AGENTS.md`, `.agents/rules/live-environment-safety.md`, and `config/environment.ts`.
* **Package manager rule:** npm remains the only Node package manager; image builds use `npm ci` and the committed lockfiles.
* **Out of scope:** Production deployment, automatic cross-repository promotion, Kubernetes manifests, application source bind mounts/hot reload, ingestion services, custom platform images, feature-level Playwright scenarios, and a local Playwright guard mode.

## Preconditions

* The GitHub organization permits GitHub Actions to create private GHCR packages.
* The application repositories can publish packages with `GITHUB_TOKEN` and workflow `packages: write` permission.
* Each GHCR package is linked to its source repository and grants the QA team read access, either through inherited repository permissions or explicit package access.
* Each QA engineer has Docker Compose v2 and a GitHub identity authorized to read the private packages.
* If the organization requires SSO authorization for package access, the engineer's credential is authorized accordingly.
* The `drimsheet-qa` GitHub repository is created or identified and its local checkout receives an `origin`; the current local repository has no configured remote.
* CI runners can build both `linux/amd64` and `linux/arm64` images. If the team knows all QA machines use one architecture, the implementation may narrow this only through an explicit plan update.

## Confirmed Findings

1. **No application container precedent exists.** Neither `drimsheet-core` nor `drimsheet-web` contains a Dockerfile or Docker ignore file.
2. **Core has the only current application CI workflow.** `drimsheet-core/.github/workflows/test.yml` runs tests on pushes and pull requests to `main`, but it does not build or publish an image and currently uses Node.js 20.
3. **Web has no repository workflow.** No first-party file exists under `drimsheet-web/.github/workflows`.
4. **The platform Compose file is source-dependent.** `drimsheet-platforms/docker-compose.yml` bind-mounts `postgres/init.sh` and `rabbitmq/init.sh`, so QA cannot directly consume that file without cloning the repository.
5. **Core already exposes container-suitable probes.** `drimsheet-core/src/infra/server/health.ts` provides `/health/live` and `/health/ready`; readiness waits for startup completion and probes PostgreSQL.
6. **Core already supports container service URLs.** `drimsheet-core/src/infra/config/vars.config.ts` consumes `POSTGRES_URL`, `REDIS_URL`, and `RABBITMQ_URL` as environment-provided connection strings.
7. **Core migrations have a reusable command.** `drimsheet-core/package.json` defines `npm run db:migrate`, and `npm start` currently runs migrations before starting the application. Compose should instead use the same image in a one-shot migration service and start the long-running container directly to prevent duplicate migration ownership.
8. **Web API location is a build-time contract.** `drimsheet-web/src/shared/lib/api/index.ts` builds its API base from `VITE_API_URL`; `.env.example` documents it as a public build-time value.
9. **The QA runner rejects local Compose today.** `drimsheet-qa/config/environment.ts` requires HTTPS and exact equality with a committed approved QA hostname. `playwright.config.ts` calls that validator during configuration and defines no local `webServer`.
10. **Repository changes are currently uncommitted.** All four worktrees contain untracked or staged work. Implementation must preserve unrelated changes and use repository-specific commits or pull requests.

## Implementation Scope

### In Scope

* Build minimal, non-root, multi-stage production images for core and web.
* Validate application tests/builds before publishing images.
* Publish private, multi-architecture images to GHCR from each owning repository.
* Tag published images with the immutable Git commit SHA and attach OCI source/revision labels.
* Reference full image digests from the QA manifest; do not execute a floating tag during an approved QA run.
* Start official pinned PostgreSQL, Redis, and RabbitMQ images locally with health checks and named volumes.
* Run database migrations once before core readiness.
* Route browser API requests through the web container to keep the image environment-neutral.
* Give QA concise login, pull, start, status, logs, stop, and reset instructions.
* Verify the complete stack without weakening the deployed-QA Playwright guard.

### Out of Scope

* Building images in `drimsheet-qa` or giving that workflow source access to other repositories.
* A central workflow that checks out and builds every application repository.
* Publishing images from untrusted fork pull requests.
* Using `latest` or another moving tag as the tested artifact identity.
* Storing GHCR credentials, application secrets, or real third-party credentials in Compose, Git, image layers, or build arguments.
* Requiring Google OAuth, Sentry, LaunchDarkly, email, AWS, or AI credentials merely to prove that the local stack boots. Authenticated scenarios depending on an external integration require a separate confirmed environment contract.
* Automatically editing `drimsheet-qa` from application workflows. Cross-repository promotion credentials and policy are deferred until manual manifest promotion becomes an observed bottleneck.

## Implementation Sequence

### Phase 1 — Confirm GHCR and runtime contracts

1. Create or confirm the `Drimsheet/drimsheet-qa` repository and configure the local `origin` without changing current working-tree content.
2. Confirm the organization package policy: packages are private, application Actions may write their own package, and the QA team has read-only access.
3. Standardize the container build runtime on Node.js 22 LTS for this work, matching `drimsheet-qa/README.md`. Validate both application lockfiles, tests, and builds on Node 22 before relying on it; if core cannot move from its current CI Node 20, stop and record a runtime-version decision rather than silently publishing a different runtime.
4. Confirm that QA machines need both `linux/amd64` and `linux/arm64`; retain both as the default to support common x86 CI/Windows machines and Apple Silicon without emulation.
5. Document the image contract:
   * package: `ghcr.io/drimsheet/<repository>`;
   * immutable tag: `sha-<full-or-unambiguous-git-sha>`;
   * tested identity: `ghcr.io/drimsheet/<repository>@sha256:<digest>`;
   * OCI labels: source repository URL and Git revision;
   * package visibility: private;
   * publisher: only the owning repository workflow.

### Phase 2 — Containerize `drimsheet-core`

1. Add `.dockerignore` excluding `.git`, `node_modules`, local `.env*`, coverage, logs, reports, documentation output, and other files not required for the build. Explicitly allow committed example files only when the build consumes them.
2. Add a multi-stage Dockerfile:
   * dependency/build stage based on a pinned Node 22 Debian slim image;
   * copy `package.json` and `package-lock.json`, run `npm ci`, then copy required source/configuration and run `npm run build`;
   * production dependency stage using `npm ci --omit=dev` only if the compiled runtime and migration command work without development dependencies;
   * runtime stage containing compiled output, production dependencies, package metadata, and migration files required by `npm run db:migrate`;
   * create/use a non-root user, expose the core port, and execute the existing compiled bootstrap entrypoint directly rather than `npm start`, because Compose owns migration ordering.
3. Do not inject `.env`, registry tokens, or third-party secrets into image layers. Runtime configuration comes only from Compose/environment injection.
4. Add a container-focused verification command or CI step that builds the image and checks `/health/live`. Full readiness is verified later with PostgreSQL and migrations.
5. Validate that the migration CLI and TypeScript migration files remain available in the runtime image. If `node-pg-migrate` or `tsx` being development-only prevents this, choose the smallest explicit fix: either move runtime-required migration tooling to production dependencies or create a dedicated migration target from the same Dockerfile. Do not silently ship the entire development tree without documenting the reason.

### Phase 3 — Containerize `drimsheet-web`

1. Add `.dockerignore` excluding `.git`, `node_modules`, local `.env*`, coverage, Playwright artifacts, Storybook output, and other non-build inputs.
2. Add a multi-stage Dockerfile:
   * Node 22 build stage using `npm ci` and `npm run build`;
   * set `VITE_API_URL` to the empty string for the same-origin `/api/v1` contract;
   * omit Sentry upload credentials and optional public observability keys from the local QA build unless a current QA requirement owns them;
   * minimal unprivileged static-server runtime containing only built assets and its server configuration.
3. Add a static-server configuration that:
   * serves the SPA with history fallback;
   * exposes a lightweight web health endpoint;
   * proxies `/api/*` to `http://core:3001` while preserving method, headers, query, and path;
   * does not proxy arbitrary destinations selected by runtime user input.
4. Build and run the image in repository CI, verify the health endpoint, and verify SPA history fallback. The complete proxy check runs in the QA Compose verification.

### Phase 4 — Publish application images to GHCR

1. In each application repository, add an image workflow with least-privilege permissions: `contents: read` and `packages: write` for the publish job.
2. On pull requests to `main`, run the existing tests/type checks/lint checks justified by that repository and build the Docker image without pushing it. This catches Dockerfile regressions without exposing package write capability to untrusted fork code.
3. On a successful push to `main`, build with Docker Buildx for `linux/amd64` and `linux/arm64`, authenticate using `GITHUB_TOKEN`, and push the immutable `sha-*` tag. A moving `main` tag may be published for human discovery, but it must never appear in the committed QA image lock.
4. Provide a manual workflow dispatch accepting a Git ref only if maintainers need to publish a non-main QA candidate now. The workflow must resolve the ref to a commit and tag the image with that SHA; it must not accept an arbitrary output image name or registry.
5. Add OCI source and revision labels so GHCR can associate each package version with its repository and commit. Configure package repository linkage/access in GitHub rather than distributing source repository URLs to QA engineers.
6. Make publication depend on successful repository tests and image build. Do not use `continue-on-error` for tests, container build, login, or push.
7. Retain repository-native workflows rather than creating a central builder:
   * refactor `drimsheet-core/.github/workflows/test.yml` into test/build/publish jobs or add a separate workflow with equivalent required gates, avoiding an untested publish path;
   * create the first application CI workflow in `drimsheet-web` using its current npm scripts and lockfile.

### Phase 5 — Add the pull-only QA Compose bundle

1. Add `compose.qa.yml` to `drimsheet-qa`. It must contain no application `build:` keys and no mounts from sibling repositories.
2. Add `.env.qa-images` containing only full digest references, for example:

   ```dotenv
   CORE_IMAGE=ghcr.io/drimsheet/drimsheet-core@sha256:<approved-digest>
   WEB_IMAGE=ghcr.io/drimsheet/drimsheet-web@sha256:<approved-digest>
   ```

   This file is a non-secret release manifest and is committed. Changes to it receive normal code review and identify exactly what QA is running.
3. Add `.env.compose.example` for runtime-only configuration. Document every value, its consumer, default, and failure behavior. Keep real secrets out of the example; use clearly local, disposable placeholders and require `.env.compose` to remain ignored.
4. Define the services:
   * `postgres` from an exact supported official image version with a named volume and `pg_isready` health check;
   * `redis` from an exact supported official image version with a named volume and `redis-cli ping` health check;
   * `rabbitmq` from an exact supported management image version with a named volume and diagnostic health check;
   * `core-migrate` using `${CORE_IMAGE}`, the core database URL, `restart: "no"`, and the explicit migration command;
   * `core` using `${CORE_IMAGE}`, container-internal database/cache/queue URLs, non-production runtime configuration, and the existing `/health/ready` probe;
   * `web` using `${WEB_IMAGE}`, depending on healthy core, exposing only the QA-facing HTTP port, and using its web health endpoint.
5. Use Compose's default project-scoped network and generated container names. Do not set global `container_name` values, which would prevent multiple worktrees or CI runs from coexisting.
6. Express startup order with health and successful-completion conditions:
   * infrastructure healthy;
   * `core-migrate` completes successfully;
   * core becomes ready;
   * web becomes healthy.
7. Publish only required host ports. Web is required. Core may be exposed on loopback for diagnostics if current QA troubleshooting requires it. PostgreSQL, Redis, RabbitMQ AMQP, and RabbitMQ management remain unexposed unless a documented present QA need consumes them.
8. Keep the Compose environment explicitly local/non-production. It must not accept production database URLs or shared-environment credentials through the committed default path.

### Phase 6 — QA operator workflow and promotion

1. Update `drimsheet-qa/README.md` with a separate **Local QA environment** section that does not imply the Playwright commands target it.
2. Document private GHCR authentication using a GitHub credential with package-read access. Prefer an interactive `docker login ghcr.io -u <username>` prompt so the token is not placed in shell history or documentation output.
3. Document the minimal lifecycle:

   ```bash
   cp .env.compose.example .env.compose
   docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml pull
   docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml up -d --wait
   docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml ps
   docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml logs
   docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml down
   ```

4. Document a separate, explicitly destructive reset command using `down --volumes`, explaining that it deletes only this Compose project's local named volumes and cannot be recovered. Do not make reset part of normal startup.
5. Define initial promotion as a maintainer-reviewed update to `.env.qa-images`:
   * obtain the multi-architecture digest from the successful owning-repository workflow/GHCR package;
   * update only the relevant image reference;
   * validate Compose configuration and boot the complete stack;
   * merge the lock update after verification;
   * record both digests in the QA result or release ticket.
6. Defer a bot-generated cross-repository pull request until manual updates create demonstrated operational cost. That later automation would require a narrowly scoped credential and an approved promotion policy.

### Phase 7 — CI verification of the QA bundle

1. Add non-secret static checks to the QA repository:
   * `docker compose ... config --quiet`;
   * reject application `build:` keys in the rendered QA Compose model;
   * verify `CORE_IMAGE` and `WEB_IMAGE` are digest references, not floating tags;
   * retain the existing `npm run typecheck` and `npm run test:config` safety checks.
2. Add an authenticated/manual integration job only after the QA repository and package access are configured. It should pull the two private digests, start the stack with disposable local credentials, wait for health, probe web and core readiness, collect bounded service logs on failure, and always tear down its own Compose project/volumes.
3. Do not run the current Playwright product suite against this stack. Continue running it only against the separately deployed, exact-host-allowlisted HTTPS QA environment.
4. Do not print Docker configuration, authorization headers, tokens, or the complete secret-bearing environment during diagnostics.

## Structural Decision Basis

| Decision | Basis | Classification |
| --- | --- | --- |
| GHCR is the private image registry | Explicit user decision | Requirement |
| QA clones only `drimsheet-qa` | Explicit user requirement | Requirement |
| Application repositories build their own images | Repository ownership implied by source/build contracts; avoids central source checkout | Smallest coherent ownership boundary |
| Pull-only Compose file lives in `drimsheet-qa` | It is the only repository available to the QA operator | Requirement-derived placement |
| Official platform images in the initial bundle | Current stack needs only one database owner and one RabbitMQ user; custom init supports currently excluded services | Present-need rule in `.agents/rules/scope-and-simplicity.md`; platform precedent at `drimsheet-platforms/docker-compose.yml` |
| One-shot migration uses the core image | Existing migration contract at `drimsheet-core/package.json` script `db:migrate`; avoids duplicate migration execution | Concrete local precedent |
| Core readiness uses `/health/ready` | Existing symbol `makeRuntimeHealth` in `drimsheet-core/src/infra/server/health.ts` | Concrete local precedent |
| Web owns static serving and `/api` proxying | Web owns its build-time API contract at `drimsheet-web/src/shared/lib/api/index.ts`; required to make the image independent of a QA machine hostname | Requirement-derived boundary |
| Digest-pinned QA manifest | QA must know exactly which artifacts it is validating; moving tags cannot provide that identity | Operational requirement |
| No local Playwright mode | Current `validateAppUrl` contract and live-environment safety rule require approved HTTPS deployed QA | Durable QA rule and concrete local precedent |
| Manual initial digest promotion | No current cross-repository bot credential, release policy, or automation precedent exists | Scope-and-simplicity rule |

No unapproved repository-wide QA test-framework pattern is introduced. The Compose bundle is a new operational boundary explicitly required by the user; it does not alter test assertions, fixtures, retries, or environment approval behavior.

## Verification Scenarios

### VS-01 — Repository-owned image publication

**Purpose**

Verify each application publishes only after its own checks pass and produces an identifiable private multi-architecture artifact.

**Checks**

1. Open a pull request changing the Dockerfile and confirm CI builds without pushing.
2. Merge an approved change to `main` and confirm the publish job pushes `sha-<commit>`.
3. Inspect the GHCR package and confirm private visibility, source/revision metadata, both target architectures, and QA-team read access.
4. Resolve the tag to its manifest digest and confirm an unauthorized identity cannot pull it.

**Expected Result**

* Failed tests/builds prevent publication.
* The package version maps to one repository commit.
* Authorized QA engineers can pull; unauthorized users cannot.

### VS-02 — Source-free QA startup

**Purpose**

Verify a machine containing only `drimsheet-qa` can run the environment.

**Checks**

1. Authenticate to GHCR with package-read access.
2. Pull the committed digest references.
3. Start Compose with a new project name and empty volumes.
4. Wait for infrastructure health, migration completion, core readiness, and web health.
5. Open the web entry point and call a non-mutating API path through the `/api` proxy.

**Expected Result**

* No sibling source repository or build context is read.
* All services become healthy after one command.
* Database migrations complete once before core starts.
* Browser API requests remain on the web origin and reach core.

### VS-03 — Immutable, reproducible execution

**Purpose**

Verify the committed QA manifest selects exact artifacts.

**Checks**

1. Render the Compose model and inspect application image references.
2. Pull and record the resolved digests.
3. Recreate the stack without changing `.env.qa-images`.

**Expected Result**

* Both application references contain `@sha256:`.
* Recreating the stack selects the same image manifests even if moving GHCR tags change.

### VS-04 — Failure and recovery

**Purpose**

Verify common operator failures are clear and recoverable.

**Checks**

1. Attempt a pull without GHCR access.
2. Start with a missing required runtime variable.
3. Make migrations fail with a disposable invalid database configuration.
4. Restore valid configuration and restart.

**Expected Result**

* Authentication and configuration failures are explicit and do not expose secrets.
* Core/web do not report healthy after migration failure.
* Correcting the configuration allows a clean recovery without cloning application source.

### VS-05 — Existing live-QA safety boundary remains intact

**Purpose**

Verify local environment support does not create a routine test-target bypass.

**Checks**

1. Run `npm run test:config`.
2. Attempt the Playwright configuration with the local HTTP web URL.

**Expected Result**

* Existing configuration tests pass.
* The local HTTP URL remains rejected before browser launch.

## Environment and Credential Strategy

* CI publication uses repository `GITHUB_TOKEN`; no long-lived registry write token is added to application repository secrets.
* QA engineers receive package-read access only. Their credential is entered interactively for `docker login` and managed by the local Docker credential store.
* `.env.qa-images` is committed because digests are public identifiers within the authorized package context, not credentials.
* `.env.compose` is ignored and contains local runtime secrets/configuration. It must contain no production or shared-QA credentials.
* Application image builds receive no runtime secret build arguments. Optional observability and external-integration configuration is injected only at runtime when a current scenario requires it.

## Risks

* **Core migration tooling may not fit a production-only dependency image.** Verify the migration command in the built image before finalizing its stages; document any runtime dependency reclassification.
* **Node runtime mismatch may reveal incompatibility.** Core CI currently uses Node 20 while the QA repository specifies Node 22. Phase 1 makes Node 22 validation a gate rather than assuming compatibility.
* **Web proxy behavior could change cookies, redirects, or OAuth callbacks.** Verify headers, forwarded protocol/host, and callback behavior for each confirmed authenticated scenario before automating it. Initial stack acceptance may use non-authenticated paths.
* **Private GHCR access can block QA onboarding.** Test package access with a representative QA account before declaring the workflow ready, and document the organization/SSO steps without sharing tokens.
* **Multi-architecture builds increase CI duration.** Build caching should mitigate this; narrow architectures only after confirming the supported QA machine fleet.
* **Digest promotion is initially manual.** Reviewable lock changes favor traceability; automate only after the release owner defines promotion authority and cadence.
* **Local Compose can drift from hosted QA.** Reuse identical application digests and the same-origin API contract where possible, but continue treating deployed HTTPS QA as authoritative for the existing Playwright suite.

## Verification

Repository checks during implementation:

```bash
# drimsheet-core
npm ci
npm test
npm run build
docker build -t drimsheet-core:verify .

# drimsheet-web
npm ci
npm run lint
npm run build
docker build -t drimsheet-web:verify .

# drimsheet-qa
npm ci
npm run typecheck
npm run test:config
docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml config --quiet
```

Complete pull-only integration check after packages exist:

```bash
docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml pull
docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml up -d --wait
docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml ps
docker compose --env-file .env.qa-images --env-file .env.compose -f compose.qa.yml down
```

Verify service health through the exact published ports and endpoints chosen in Compose. Do not run the current Playwright product commands against the local HTTP URL.

## Assumptions

* The GitHub organization slug remains `drimsheet`, consistent with the configured application/platform remotes. Validate package-name casing when the first package is created; GHCR image references use lowercase.
* The current QA-required application set is `drimsheet-core` and `drimsheet-web`; ingestion and other consumers are not required to boot the tested user journey.
* Node 22 supports both application builds. Phase 1 validation must confirm this before image implementation proceeds.
* A same-origin `/api/v1` browser contract is acceptable for local QA and compatible deployment environments. Validate existing CORS, redirects, and OAuth expectations before authenticated coverage relies on it.

## Follow-Up Decisions

These do not block the initial source-free local environment:

* Whether a future local Playwright mode is wanted. If so, approve a separate committed local-target contract without weakening the deployed-host guard.
* Whether application workflows should automatically open digest-promotion pull requests in `drimsheet-qa`. This requires a release owner, trigger policy, and narrowly scoped cross-repository credential.
* Whether the local stack must add ingestion or another service. A confirmed need may justify restoring the platform repository's extra PostgreSQL/RabbitMQ initialization through a versioned image or self-contained bundle.
* Whether hosted QA deployment will consume the same digest lock directly. That belongs to the deployment/release workflow rather than the initial developer-machine Compose bundle.

## Completion Criteria

Implementation is complete when:

* Core and web workflows pass repository checks and publish private multi-architecture GHCR images tagged by commit SHA.
* Both GHCR packages are linked to their source repositories and readable by a representative QA account with no source-repository clone.
* `drimsheet-qa` commits a Compose file with no sibling build contexts and a reviewed digest lock for both applications.
* A clean machine containing only Docker, GHCR package-read credentials, and `drimsheet-qa` can pull and start the complete stack with `docker compose up --wait`.
* PostgreSQL, Redis, RabbitMQ, core migration, core readiness, web health, SPA fallback, and `/api` proxying are verified.
* Recreating the stack from the same lock selects the same application image digests.
* Operator documentation covers authentication, configuration, startup, diagnostics, shutdown, and the destructive nature of volume reset.
* No credential appears in Git, image history, CI logs, or committed Compose configuration.
* `npm run typecheck` and `npm run test:config` still pass, and the local HTTP URL remains rejected by the existing Playwright environment guard.
