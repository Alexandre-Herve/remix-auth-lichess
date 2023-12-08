# LichessStrategy

❌ Not ready

Lichess OAuth requires PKCE, which is not implemented there. See https://github.com/sergiodxa/remix-auth-oauth2/issues/24


## Supported runtimes

| Runtime    | Has Support |
| ---------- | ----------- |
| Node.js    | ✅          |
| Cloudflare | ✅          |

## How to use

### Installation

```bash
npm install remix-auth-lichess
```

### Usage

```ts
import { LichessStrategy } from 'remix-auth-lichess'

authenticator.use(
  new LichessStrategy(
    {
      clientID: 'arbitrary-unique-id',
      callbackURL: 'http://127.0.0.1:3000/auth/lichess/callback',
    },
    async function ({
      accessToken,
      refreshToken,
      extraParams,
      profile,
      context,
      request,
    }) {
      return await User.findOrCreate({ lichessId: profile.id })
    }
  )
)
```
