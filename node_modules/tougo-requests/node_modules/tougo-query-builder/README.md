# tougo-query-builder
query builder for postgres
A little library for constructing raw sql queries.

# example 1
SELECT * FROM PROPERTY
```javascript
var q = qb.select('*')+qb.from('property');
```

# example 2
SELECT * FROM PROPERTY LEFT JOIN TENANT ON PROPERTY.TENANT_ID = TENANT.TENANT_ID
```javascript
var q = qb.select('*') + qb.from('property')+qb.leftjoin('property','tenant', 'tenant_id');
```

# methods
```javascript
var Constructor = require('tougo-query-builder');
```

## var instance = new Constructor()
describe constructor

## instance.method()
describe methods

# install
```bash
npm install tougo-query-builder
```

# test
```bash
npm test
```

# license
ISC


