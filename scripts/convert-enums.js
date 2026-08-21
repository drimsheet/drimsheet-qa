import fs from 'fs';
import path from 'path';

const API_FILE_PATH = path.resolve('utils/api/Api.ts');

function convertEnums() {
  let content = fs.readFileSync(API_FILE_PATH, 'utf-8');

  // Match `export enum Name { ... }`
  const enumRegex = /export enum (\w+) \{([^}]+)\}/g;

  // We need to keep a map of enum names to const names to replace usages later
  const enumToConst = {};

  content = content.replace(enumRegex, (match, enumName, enumBody) => {
    const constName = enumName.startsWith('U')
      ? 'E' + enumName.slice(1)
      : 'E' + enumName;
    enumToConst[enumName] = constName;

    // The body contains `Key = "Value",`. We can just use the exact body and change `=` to `:`
    // We should split by line and replace
    const newBody = enumBody
      .split('\n')
      .map((line) => {
        // match `Key = "Value",`
        return line.replace(/\b(\w+)\s*=\s*(.*)/, '$1: $2');
      })
      .join('\n');

    return `export const ${constName} = {${newBody}} as const;\nexport type ${enumName} = (typeof ${constName})[keyof typeof ${constName}];`;
  });

  // Replace usages like ContentType.Json with EContentType.Json
  for (const [enumName, constName] of Object.entries(enumToConst)) {
    // Regex to match `EnumName.Member` but not `export type EnumName`
    // We can replace `EnumName.` with `ConstName.` safely because `EnumName` used as type won't have a dot after it
    const usageRegex = new RegExp(`\\b${enumName}\\.`, 'g');
    content = content.replace(usageRegex, `${constName}.`);
  }

  fs.writeFileSync(API_FILE_PATH, content, 'utf-8');
  console.log('✅ Converted enums to consts in Api.ts');
}

convertEnums();
