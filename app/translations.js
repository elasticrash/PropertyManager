/**
 * Created by stefanos on 26-Dec-15.
 */
app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_GR: 'greek',
        PROP_TENANT: 'PROPERTY+TENANT',
        NEW_PROPERTY: 'NEW PROPERTY',
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
        NEW_TENANT: 'NEW TENANT',
        NEW_PAYMENT: 'NEW PAYMENT'
    });
    $translateProvider.translations('el', {
        BUTTON_LANG_EN: 'ΑΓΓΛΙΚΑ',
        BUTTON_LANG_GR: 'ΕΛΛΗΙΝΙΚΑ',
        PROP_TENANT: 'ΑΚΙΝΗΤΟ+ΕΝΟΙΚΙΑΣΤΗΣ',
        NEW_PROPERTY: 'ΝΕΟ ΑΚΙΝΗΤΟ',
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
        NEW_TENANT: 'ΝΕΟΣ ΕΝΟΙΚΙΑΣΤΗΣ',
        NEW_PAYMENT: 'ΝΕΑ ΠΛΗΡΩΜΗ'
    });
    $translateProvider.preferredLanguage('el');
});