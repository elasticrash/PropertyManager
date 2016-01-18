/**
 * Created by tougo on 19/12/15.
 */
module.exports = function(){
    this.select = function (what) {
        this.query += " SELECT " + what;
        return this;
    };
    this.from = function (table) {
        this.query += " FROM " + table;
        return this;
    };
    this.innerjoin = function (table1, table2, attribute) {
        this.query += " INNER JOIN " + table2 + " ON " + table1 + "." + attribute + " = " + table2 + "." + attribute;
        return this;
    };
    this.leftjoin = function (table1, table2, attribute) {
        this.query += " LEFT JOIN " + table2 + " ON " + table1 + "." + attribute + " = " + table2 + "." + attribute;
        return this;
    };
    this.where = function (expression) {
        this.query += " WHERE " + expression;
        return this;
    };
    this.insertinto = function (table, attributes, values) {
        if (attributes.length === values.length) {
            this.query += " INSERT INTO " + table + "(" + attributes.join() + ") VALUES " + "(" + values.join() + ")";
            return this;
        }
        this.error += "attribute, values length missmatch";
        return this;
    };
    this.insertintowithoutputid = function (table, attributes, values, keyname) {
        if (attributes.length === values.length) {
            this.query += " INSERT INTO " + table + "(" + attributes.join() + ") VALUES " + "(" + values.join() + ") RETURNING "+ keyname ;
            return this;
        }
        this.error += "attribute, values length missmatch";
        return this;
    };
    this.update = function (table, attributes, values) {
        if (attributes.length === values.length) {
            var sql = " UPDATE " + table + " SET ";
            var i;
            var set = [];
            for (i = 0; i < attributes.length; i+=1) {
                set.push(attributes[i] + "=" + values[i]);
            }
            sql += set.join();
            this.query += sql;
            return this;
        }
        this.error += "attribute, values length missmatch";
        return this;
    };
    this.delete = function () {
        this.query += " DELETE ";
        return this;
    };
    this.groupby = function(attributes) {
        var sql =" GROUP BY(";
        if (attributes.length > 0){
            sql += attributes.join();
            sql += ")";
            this.query += sql;
            return this;
        }
        this.error += "attribute array is empty or inconsistent";
        return this;
    };
    this.union = function(query1, query2) {
        this.query += query1+ " UNION " +query2;
        return this;
    };
    this.intersect = function(query1, query2) {
        this.query += query1+ " INTERSECT " +query2;
        return this;
    };
    this.except = function(query1, query2) {
        this.query += query1+ " EXCEPT " +query2;
        return this;
    };
    this.orderby = function(attributes, ordertype) {
        var sql = " ORDER BY";
        var orderby = [];
        if (attributes.length === ordertype.length) {
            var i;
            for (i = 0; i < attributes.length; i+=1) {
                orderby.push(attributes[i] + " " + ordertype[i]);
            }
            sql += orderby.join();
            this.query += sql;
            return this;
        }
        this.error += "attribute, ordertype length missmatch";
        return this;
    };
    this.primarykey = function(table) {
        var sql = "SELECT a.attname, format_type(a.atttypid, a.atttypmod) AS data_type FROM pg_index i JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey) WHERE  i.indrelid = '"+ table+"'::regclass AND i.indisprimary";
        this.query = sql;
        return this;
    };
    this.getcolumnsanddatatypes = function(table) {
        var sql = "SELECT a.attname as column_name, format_type(a.atttypid, a.atttypmod) AS data_type FROM pg_attribute a JOIN pg_class b ON (a.attrelid = b.relfilenode) WHERE b.relname = '"+table+"' and a.attstattarget = -1";
        this.query = sql;
        return this;
    };
    this.in = function(attributes) {
        var sql =" IN (";
        if (attributes.length > 0){
            sql += attributes.join();
            sql += ")";
            this.query += sql;
            return this;
        }
        this.error += "attribute array is empty or inconsistent";
        return this;
    };
    this.notin = function(attributes) {
        var sql =" NOT IN (";
        if (attributes.length > 0){
            sql += attributes.join();
            sql += ")";
            this.query += sql;
            return this;
        }
        this.error += "attribute array is empty or inconsistent";
        return this;
    };
    this.between = function(value1, value2) {
        var sql =" BETWEEN " + value1 + " AND " + value2;
        this.query += sql;
        return this;
    };
    this.notbetween = function(value1, value2) {
        var sql =" BETWEEN " + value1 + " AND " + value2;
        this.query += sql;
        return this;
    };
    this.take = function(value1) {
        if((typeof value1 === 'number') && (x % 1 === 0)){
            var sql =" LIMIT " + value1;
            this.query += sql;
            return this;
        }

        this.error += "value in take method must be an integer number";
        return this;
    };
    this.skip = function(value1) {
        if((typeof value1 === 'number') && (x % 1 === 0)){
            var sql =" OFFSET " + value1;
            this.query += sql;
            return this;
        }

        this.error += "value in skip method must be an integer number";
        return this;
    };
    this.string = function(){
        this.startswith = function(column, expr){
            this.query += " " + column + " LIKE " + expr + "% ";
            return this;
        };
        this.endswith = function(column, expr){
            this.query += " " + column + " LIKE " + "%" + expr + " " ;
            return this;
        };
        this.contains = function(column, expr){
            this.query += " " + column + " LIKE " + "%" + expr + "% ";
            return this;
        };
        this.query = "";
        this.error = "";
    };
    this.spatial = function(){
        GeomFromEWKT = function(srid, wkt){
            this.query += " ST_GeomFromEWKT('SRID="+srid+";"+wkt+"')";
            return this;
        };
        this.GeomFromText = function(wkt, srid, internal){
            var q = " ST_GeomFromText('"+wkt+"',"+srid+")";
            if(internal){
                return q;
            }
            else {
                this.query += q;
            }
            return this;
        };
        this.AsText = function(value){
            this.query += " ST_AsText(" +value+")";
            return this;
        };
        this.Transform = function(wkt, init_srid, target_srid){
            var gft = this.GeomFromText(wkt, init_srid, true);
            this.query += " ST_Transform("+gft+","+target_srid+")";
            return this;
        };
        this.Area = function (geom_column){
            this.query += " ST_Area("+geom_column+")";
            return this;
        };
        this.Length = function (geom_column){
            this.query += " ST_Length("+geom_column+")";
            return this;
        }
        this.query = "";
        this.error = "";
    }
    this.query = "";
    this.error = "";
    this.connectionstring = "";
    this.connectandquery = function(pg, res, query, results){
        pg.connect(this.connectionstring, function(err, client, done) {
            if(err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err});
            }

            var request = client.query(query);
            console.log(query);

            request.on('row', function(row) {
                results.push(row);
            });

            request.on('end', function() {
                done();
                return res.json(results);
            });
        });
    }
}
