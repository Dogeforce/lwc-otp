public with sharing class OtpController {

    @AuraEnabled
    public static String getCode(Id recordId, String fieldName) {
        String query = 'SELECT Id, {0} FROM {1} WHERE Id = :recordId';
        SObject record = Database.query(String.format(query, new List<String>{ fieldName, recordId.getSobjectType().getDescribe().getName() }));
        return String.valueOf(record.get(fieldName));
    }
}
