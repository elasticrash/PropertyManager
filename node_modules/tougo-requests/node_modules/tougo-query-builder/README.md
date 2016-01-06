# tougo-query-builder
query builder for postgres
A little library for constructing raw sql queries.

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
