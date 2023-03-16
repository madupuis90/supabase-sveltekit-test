# NOTES

## Development Setup

- Windows 10
- WSL2 Ubuntu 20.04
- VSCode in WSL2

## Code & Deployment

- Github
- Cloudflare Pages
- Supabase

## Installation

### Docker

I follwed the docker installation for Linux : https://docs.docker.com/engine/install/ubuntu/
I used `apt` instead of `apt-get` for the commands
On WSL2, docker doesn't start automatically so I added this command in `~/.bashrc`, I read about starting the service from
`/etc/wsl.conf` using `[boot]` to start the docker service but I couldn't get it to work

```
# Start docker on boot
if service docker status 2>&1 | grep -q "is not running"; then
    wsl.exe -d "${WSL_DISTRO_NAME}" -u root -e /usr/sbin/service docker start >/dev/null 2>&1
fi
```

### Supabase

I created an account for supabase and followed the articles to use the CLI : https://supabase.com/docs/guides/cli

Using `supabase start` you can start all docker images to run supabase locally.

You can the supabase dashboard by going `http://localhost:54323`

To manage database migration, I will make the changes using the UI or manually create scripts. When you make changes with the UI, you can use the command `supabase db diff -f <migration_name>` to create a new migration script.

If you want (but I'm not doing this), you can link your local database to your remote database using `supabase link --project-ref <project_id>` and then use `supabase db push` to sync your local changes to your remote. If local is out of date, you can also pull the remote changes.

Instead in this project, I have setup github workflows (actions) for CI/CD. One of the job is test that everything works on pull request and the other one is to migrate my remote databse when I push to `master` using `supabase db push`. To do so, you can follow this documentation : https://supabase.com/docs/guides/cli/managing-environments

### Cloudflare Pages

Deploying Sveltekit application to cloudflare is fairly easy because of vite and the auto-adapter plugin. Simply go in cloudflare and create a new project for Sveltekit. The only thing is to make sure to add `NODE_VERSION` = `17` as a variable.

### Connecting the application to Supabase

This turned out to be a lot more difficult than I thought because I couldn't find my API keys for service_role for local development. Everything was working when connecting to remote because the Dashboard exposes the keys, but the local Dashboard is missing that tab.

I ended up posting on their discord with no luck. Finally I found this blog post : https://supabase.com/blog/supabase-cli and I realised that I could simply stop and re-start my containers using the CLI and the keys are shown upon starting supabase (normally supabase is already running when I boot my machine so I couldn't see them).

```js
// src/lib/db.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '$env/static/private';

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```
