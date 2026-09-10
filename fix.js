const fs = require('fs');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app/admin').concat(walk('./src/app/actions'));

files.forEach(f => {
  if (f.endsWith('.tsx') || f.endsWith('.ts')) {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;
    content = content.replace(/href=\"\/jobs/g, 'href=\"/admin/jobs');
    content = content.replace(/href=\"\/customers/g, 'href=\"/admin/customers');
    content = content.replace(/href=\{\`\/jobs/g, 'href={`/admin/jobs');
    content = content.replace(/href=\{\`\/customers/g, 'href={`/admin/customers');
    content = content.replace(/redirect\('\/jobs/g, 'redirect(\'/admin/jobs');
    content = content.replace(/redirect\('\/customers/g, 'redirect(\'/admin/customers');
    content = content.replace(/revalidatePath\('\/jobs/g, 'revalidatePath(\'/admin/jobs');
    content = content.replace(/revalidatePath\('\/customers/g, 'revalidatePath(\'/admin/customers');
    
    if (content !== original) {
      fs.writeFileSync(f, content);
      console.log('Updated ' + f);
    }
  }
});
