import fs from 'fs';
import path from 'path';

function checkImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      checkImports(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
          // Resolve path
          const resolvedBase = path.resolve(dir, importPath);
          // Try extensions
          const extensions = ['.ts', '.tsx', '.css', '.json', '', '/index.ts', '/index.tsx'];
          let found = false;
          let exactMatch = false;
          for (const ext of extensions) {
            const testPath = resolvedBase + ext;
            if (fs.existsSync(testPath)) {
              found = true;
              // Check case exactness
              const dirName = path.dirname(testPath);
              const baseName = path.basename(testPath);
              const actualFiles = fs.readdirSync(dirName);
              if (actualFiles.includes(baseName)) {
                exactMatch = true;
              } else {
                console.log(`CASE MISMATCH: ${fullPath} imports ${importPath} -> matches ${baseName} but actual is different casing.`);
              }
              break;
            }
          }
          if (!found) {
             console.log(`BROKEN IMPORT: ${fullPath} imports ${importPath}`);
          }
        }
      }
    }
  }
}

checkImports('src');
