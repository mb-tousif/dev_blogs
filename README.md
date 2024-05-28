# `Dev Recipes Blog` Project Backend
<!-- Project description -->
This is a project to create a blog for developers to share their Blogs, Articles, Notes and News. This project is the backend part of the project.

---

## Getting Started
<!-- Instructions to get a copy of the project up and running on your local machine for development and testing purposes -->
To get a copy of the project up and running on your local machine for development and testing purposes, you need to follow the following steps.

### Prerequisites
<!-- List of softwares and libraries required to run the project -->
- Node.js

### Installing
<!-- Instructions to install the project and its dependencies -->
1. Clone the repository
```bash
git clone 
```
2. Install the dependencies
```bash
  npm install
```
3. Create a `.env` file in the root directory of the project and add the following environment variables
```env

  PORT=3000
  DATABASE_URL=postgres://username:password@localhost:5432/dbname
  APP_NAME=`Dev Recipes Blog`
  SALT_ROUNDS=Numeric Value
  JWT_SECRET=Secret Key
  JWT_EXPIRES_IN=Time

```
4. Run the project
```bash
  npm start
```

---

## Authors
<!-- List of authors -->
`Dev Tousif`
## License
<!-- Project License -->
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.