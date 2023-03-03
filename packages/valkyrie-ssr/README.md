# Valkyrie SSR

## Template setup

you need to set the template on init like this.

```ts
import { serverUtil } from '@astlaure/valkyrie-ssr';

serverUtil.template = fs.readFileSync('public/index.html', { encoding: 'utf-8' });
```
