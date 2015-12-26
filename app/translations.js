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
        DELETE: 'DELETE'
    });
    $translateProvider.translations('el', {
        BUTTON_LANG_EN: 'ΑΓΓΛΙΚΑ',
        BUTTON_LANG_GR: 'ΕΛΛΗΙΝΙΚΑ',
        PROP_TENANT: 'ΑΚΙΝΗΤΟ+ΕΝΟΙΚΙΑΣΤΗΣ',
        NEW_PROPERTY: 'ΝΕΟ ΑΚΙΝΗΤΟ',
        UPDATE: 'ΕΝΗΜΕΡΩΣΗ',
        DELETE: 'ΔΙΑΓΡΑΦΗ'
    });
    $translateProvider.preferredLanguage('en');
});