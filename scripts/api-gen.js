import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { generateApi } from 'swagger-typescript-api';
import config from '../api-gen.config.js';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TEMP_SWAGGER_PATH = path.resolve('swagger.tmp.json');
const OUTPUT_DIR = path.resolve('utils/api');

async function fetchSwaggerFromGitHub() {
  const url = `https://raw.githubusercontent.com/${config.org}/${config.repo}/${config.branch}/${config.swaggerPath}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
      Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : '',
      Cache: 'no-cache',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Swagger: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}

async function generateTypes() {
  try {
    const swaggerJSON = await fetchSwaggerFromGitHub();

    // Write the swagger to a temp file, swagger-typescript-api requires a file
    fs.writeFileSync(TEMP_SWAGGER_PATH, JSON.stringify(swaggerJSON, null, 2));

    // Ensure output directory exists
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    await generateApi({
      name: 'api.ts', // The generated file name
      input: TEMP_SWAGGER_PATH, // Path to swagger.json
      output: OUTPUT_DIR, // Where to save generated code
      httpClientType: 'axios', // or "axios"
      generateClient: true, // Generate API client along with types
      defaultResponseAsSuccess: false,
    });

    fs.unlinkSync(TEMP_SWAGGER_PATH); // clean up
    console.log(`✅ API client & types generated in ${OUTPUT_DIR}`);
  } catch (err) {
    console.error('❌ Failed to generate types:', err);
    process.exit(1);
  }
}

generateTypes();
