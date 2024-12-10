module-create:
	nest g resource modules/$(name) --no-spec
db-migrate:
	npx sequelize-cli db:migrate
generate-migration:
	npx sequelize-cli migration:generate --name $(name)