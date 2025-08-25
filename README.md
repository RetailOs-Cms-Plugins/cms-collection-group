# Plugin

## Docs

 - [Testing Guide](./tests/README.md)
 - [Release Guide](./RELEASE_GUIDE.md)


## Steps to Create a New Plugin from Template

### 1. Clone the Repository

- HTTPS
```bash
git clone https://github.com/RetailOs-Cms-Plugins/plugin-template.git
cd plugin-template
```

- SSH
```bash
git clone git@github.com:RetailOs-Cms-Plugins/plugin-template.git
cd plugin-template
```

### 2. Clean Git History
```bash
# Remove existing Git history
rm -rf .git

# Initialize new repository
git init
git add .
git commit -m "Initial commit from template"
```

### 3. Connect to New Repository
```bash
# Add new remote
git remote add origin <new-repo-url>
git branch -M main
git push -u origin main
```

### 4. Update Dependencies to Latest Version
- Install dependencies
```bash
pnpm install
```

- Check for outdated dependencies
```bash
pnpm outdated
```

- Update all dependencies to latest versions
```bash
pnpm update
```



### 5. Run in Development Environment
- Start development environment
```bash
pnpm dev
```

- Test project build
```bash
pnpm build
```

## Additional Tips

- Make sure to update `package.json` with your new plugin details
- Update the `README.md` with documentation specific to your plugin
- Remove or update template-specific files that are not relevant
- Consider updating dependencies in `package.json` before first install