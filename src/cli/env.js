import process from 'node:process';

const PREFIX = 'RSS_'

const parseEnv = () => {
  const envVariables = process.env;
  
  const currentKeys = Object.keys(envVariables).filter(key => key.startsWith(PREFIX));

  if (currentKeys.length > 0) {
    console.log(`Variables with prefix "${PREFIX}":`);
    currentKeys.forEach((key) => console.log(`${key}=${envVariables[key]};`));
  } else {
    console.log(`There are no variables with "${PREFIX}" prefix`);
  }
};

parseEnv();
