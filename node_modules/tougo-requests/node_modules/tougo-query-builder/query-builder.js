/**
 * Created by tougo on 19/12/15.
 */
module.exports = {
    select: function (what) {
        return "select " + what + " ";
    }
    ,
    from: function (table) {
        return "from " + table + " ";
    }
    ,
    innerjoin: function (table1, table2, attribute) {
        return " INNER JOIN " + table2 + " ON " + table1 + "." + attribute + " = " + table2 + "." + attribute + " "
    },
    leftjoin: function (table1, table2, attribute) {
        return " LEFT JOIN " + table2 + " ON " + table1 + "." + attribute + " = " + table2 + "." + attribute + " "
    },
    where: function (expression) {
        return "where " + expression;
    },
    insertinto: function (table, attributes, values) {
        if (attributes.length === values.length) {
            return "INSERT INTO " + table + "(" + attributes.join() + ") VALUES " + "(" + values.join() + ")";
        }
        return "attribute, values length missmatch";
    },
    insertintowithoutputid: function (table, attributes, values, keyname) {
        if (attributes.length === values.length) {
            return "INSERT INTO " + table + "(" + attributes.join() + ") VALUES " + "(" + values.join() + ") RETURNING "+ keyname ;
        }
        return "attribute, values length missmatch";
    },
    update: function (table, attributes, values) {
        if (attributes.length === values.length) {
            var sql = "UPDATE " + table + " SET "
            var i;
            var set = [];
            for (i = 0; i < attributes.length; i++) {
                set.push(attributes[i] + "=" + values[i]);
            }
            return sql += set.join();
        }
        return "attribute, values length missmatch";
    },
    delete: function (what) {
        return "delete ";
    }
}