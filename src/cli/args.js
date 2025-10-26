import process from 'node:process';

const parseArgs = () => {
  const args = process.argv;
  const parsedArguments = [];

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const propName = arg.substring(2);
      let value = 'undefined'; 
      
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        value = args[i + 1];
        i++;
      }

      parsedArguments.push([propName, value]);
    }
  }

  if (parsedArguments.length > 0) {
    console.log('Parsed command line arguments:');
    console.log( parsedArguments.map(([arg, value]) => `${arg} is ${value}`).join(', '));
  } else {
    console.log('There are no parsed command line arguments');
  }
};

parseArgs();
