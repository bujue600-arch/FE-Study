console.log(process.arch);
console.log(process.cwd());
console.log(process.argv.includes("11"));
console.log(process.memoryUsage());

process.exit();
process.kill(process.pid);

console.log(process.env);
