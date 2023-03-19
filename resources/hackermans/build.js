import esbuild from 'esbuild';
import { env } from "process"

const config = {
  entryPoints: {
    client: 'src/client/index.ts',
    server: 'src/server/index.ts',
  },
  outdir: 'dist',
  bundle: true,
  minify: true,
  logLevel: "info",
}

if(env.IS_WATCH){
  let ctx = await esbuild.context(config);
  await ctx.watch();
}else{
  await esbuild.build(config);
}