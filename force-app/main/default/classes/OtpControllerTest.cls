@IsTest
private class OtpControllerTest {

    @IsTest
    static void test_getCode() {
        Account a = new Account(Name='Test');
        insert a;

        Test.startTest();
        System.assertEquals('Test', OtpController.getCode(a.Id, 'Name'));
        Test.stopTest();
    }
}
