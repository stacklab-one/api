To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000


## Note:

If you want to run nuxt studio, you first need to create a local CA by installing mkcert and running the following commands:

```sh
mkcert -install
```

Then: don't use the normal studio command as in the drizzle documentation, but use the following command:
```sh
./scripts/studio.sh
```

This command will automatically use the correct config file for the "out-of-docker" studio