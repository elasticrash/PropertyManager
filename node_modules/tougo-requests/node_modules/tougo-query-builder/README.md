# tougo-query-builder
query builder for postgres
A little library for constructing raw sql queries.

@1.3.5 we added a dependency on the [pg package](https://www.npmjs.com/package/pg)
so as to be able, by using for example express, to write a simple rest end point directly
 through this package. So don't forget to do a npm install to get the right packages.

 ### example
 ```javascript
 var express = require('express');
 var router = express.Router();
 var path = require('path');
 var connectionString = "postgres://postgres:password@localhost:5432/database";
 var app = express();
 var morgan = require('morgan');
 var bodyParser = require('body-parser');
 var methodOverride = require('method-override');
 var qb =require('tougo-query-builder');

 app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({'extended':'true'}));
 app.use(bodyParser.json());
 app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
 app.use(methodOverride());
 app.listen(3000);

 app.get('/api/property/list', function(req, res) {
     var results = [];
     var q = new qb;
     var qstring = q.select('*').from('property').leftjoin('property','tenant', 'tenant_id');
     q.connectionstring = connectionString;
     results = q.connectandquery(res, qstring.query, results);
 });
  ```

[LIST OF SUPPORTED FUNCTIONS](https://github.com/elasticrash/tougo-query-builder/wiki/Function-List)

# examples
### initialize
```javascript
var Constructor = require('tougo-query-builder');
var qb = new Constructor;
```
### example 1
SELECT * FROM PROPERTY
```javascript
var q = qb.select('*').from('property').query;
```
### example 2
SELECT * FROM PROPERTY LEFT JOIN TENANT ON PROPERTY.TENANT_ID = TENANT.TENANT_ID
```javascript
var q = qb.select('*').from('property').leftjoin('property','tenant', 'tenant_id').query;
```
### example 3
UPDATE TENANT SET at1 = 'val1', at2 = 'val2' WHERE tenant_id = 27
```javascript
var attributes = ["at1", "at2"];
var values = ["'val1'", "'val2'"];
var keyexpression = "tenant_id = 27";
var q = qb.update("tenant", attributes, values).where(keyexpression).query;
```
### example 4 (spatial)
SELECT  ST_Transform(ST_GeomFromText('POINT(743238 2967416)',2249),4326)
```javascript
var qsp = new qb.spatial
var q1 = qsp.Transform("POINT(743238 2967416)", 2249, 4326).query;
var qb2 = new Constructor;
var q2 = qb2.select(q1).query;
```

# methods
```javascript
var Constructor = require('tougo-query-builder');
```

# install
```bash
npm install tougo-query-builder
```

# license
ISC
