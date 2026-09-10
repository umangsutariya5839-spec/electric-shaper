const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/href="\/customers/g, 'href="/admin/customers')
    .replace(/href='\/customers/g, "href='/admin/customers")
    .replace(/href="\/jobs/g, 'href="/admin/jobs')
    .replace(/href='\/jobs/g, "href='/admin/jobs")
    .replace(/redirect\('\/customers/g, "redirect('/admin/customers")
    .replace(/redirect\('\/jobs/g, "redirect('/admin/jobs")
    .replace(/revalidatePath\('\/customers/g, "revalidatePath('/admin/customers")
    .replace(/revalidatePath\('\/jobs/g, "revalidatePath('/admin/jobs");
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./src/app/admin/customers');
walkDir('./src/app/admin/jobs');
walkDir('./src/app/actions');
