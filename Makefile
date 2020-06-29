## Set the distribution folder
ifndef DISTRIBUTIONS_DIR
override DISTRIBUTIONS_DIR=./release
endif

.PHONY: clean release

audit: ## Checks for vulnerabilities in dependencies
	@npm audit

build: ## Builds the package for web distribution
	@npm run build

clean: ## Remove previous builds and any test cache data
	@if [ -d $(DISTRIBUTIONS_DIR) ]; then rm -r $(DISTRIBUTIONS_DIR); fi

help: ## Show all commands available
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Installs the dependencies for the packge
	@npm install

lint: ## Runs the standard-js lint tool
	@npm run lint

outdated: ## Checks for outdated packages via npm
	@npm outdated

release: ## Full production release (creates release in Github)
	@goreleaser --rm-dist

release-test: ## Full production test release (everything except deploy)
	@goreleaser --skip-publish --rm-dist

release-snap: ## Test the full release (build binaries)
	@goreleaser --snapshot --skip-publish --rm-dist

tag: ## Generate a new tag and push (IE: tag version=0.0.0)
	@test $(version)
	@git tag -a v$(version) -m "Pending full release..."
	@git push origin v$(version)
	@git fetch --tags -f

tag-remove: ## Remove a tag if found (IE: tag-remove version=0.0.0)
	@test $(version)
	@git tag -d v$(version)
	@git push --delete origin v$(version)
	@git fetch --tags

tag-update: ## Update an existing tag to current commit (IE: tag-update version=0.0.0)
	@test $(version)
	@git push --force origin HEAD:refs/tags/v$(version)
	@git fetch --tags -f

update-releaser:  ## Update the goreleaser application
	@brew update
	@brew upgrade goreleaser
