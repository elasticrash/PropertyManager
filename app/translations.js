/**
 * Created by stefanos on 26-Dec-15.
 */
app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_GR: 'greek',
        PROP_TENANT: 'Connect Property to Tenant',
        DEL_PROP_TENANT: 'Disconnect Property from Tenant',
        PROPERTY: 'Property',
        UPDATE: 'UPDATE',
        DELETE: 'DELETE',
        STREETNAME: 'Street',
        STREETNUMBER: 'Number',
        AREA: 'Area',
        DESCRIPTION: 'Description',
        FLOOR: 'Floor',
        PERCENTAGE: 'Percentage',
        CONSTRUCTIONDATE: 'Construction date',
        TENANT: 'Tenant',
        FIRSTNAME: 'Name',
        LASTNAME: 'Surname',
        AFM: 'Tax No',
        AMOUNT: 'Amount',
        PAYDATE: 'Payment date',
        MONTH: 'Month',
        PAYMENT: 'Payment'
    });
    $translateProvider.translations('el', {
        BUTTON_LANG_EN: 'ΑΓΓΛΙΚΑ',
        BUTTON_LANG_GR: 'ΕΛΛΗΝΙΚΑ',
        PROP_TENANT: 'Σύνδεση Ακινήτου με Ενοικιαστή',
        DEL_PROP_TENANT: 'Αποσύνδεση Ακινήτου από Ιδιοκτήτη',
        PROPERTY: 'Ακίνητο',
        UPDATE: 'ΕΝΗΜΕΡΩΣΗ',
        DELETE: 'ΔΙΑΓΡΑΦΗ',
        STREETNAME: 'Οδός',
        STREETNUMBER: 'Αριθμός',
        AREA: 'Εμβαδόν',
        DESCRIPTION: 'Περιγραφή',
        FLOOR: 'Όροφος',
        PERCENTAGE: 'Ποσοστό',
        CONSTRUCTIONDATE: 'Ημερομηνία Κατασκευής',
        TENANT: 'Ενοικιαστής',
        FIRSTNAME: 'Επίθετο',
        LASTNAME: 'Όνομα',
        AFM: 'ΑΦΜ',
        AMOUNT: 'Ποσό',
        PAYDATE: 'Ημερομηνία Πληρωμής',
        MONTH: 'Μήνας',
        PAYMENT: 'Πληρωμή'
    });
    $translateProvider.preferredLanguage('el');
    $translateProvider.useSanitizeValueStrategy('sanitize');
});