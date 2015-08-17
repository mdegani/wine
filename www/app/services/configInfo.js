//constants for development
(function () {
    'use strict';
    var setUp;
    setUp = 'Azure';

    if (setUp === 'Azure') {
        angular.module('winemakingApp').constant("ApiUrl", "https://wineapi.azurewebsites.net/api/");
        angular.module('winemakingApp').constant("UserToken", 'Bearer j6gMFGafRfsJady7Wm-H-JS9IVYimXW8MuJbBz-qsf279e_QSaGDL-Ati67jpM0dKvlGoYiA8AvmDTApHdBXrf18HLTPZsqsAuI3unUkD55v2LuvsjzHg40aITFOFBOGQtb0AEMZLePKuMLByobpe3ZQUX_e5F7a67oygi6oVk7ENEdRM8qx0KZIw9Bw9oQ57Cqt0ObeXtzpWmPG3Z98PChCKfoazIdcpK9Cs_5kcwyhFkufKiy5JgTbhCfO_jjD-d0Z6klhgQ8qoD9GDECanPFZOKZHebBNodkLTjX5zKXBL3ya4GxC5B-KyS4wkbQ25ln9_HiaaD97KEiWEtBSID5TWCI3dM_YVACaZdRA68NWYtbzZH4bR_rSrpqQZYtaOjrx9eFsEni8DCplCVFZjPwZhegXOjLgCA8iHtQejzs9XOQmAxGCzpaEYctUU2hfJGeCPvPJoVKOiu17gnEo25IwLXaOM4jSNOYv5oulUNc');
    }

    if (setUp === 'local') {
        angular.module('winemakingApp').constant("UserToken", 'Bearer S9f7m6J4UPWXXnoifehBycHqxxf6ihMhae5JR0MIsLgBW0cV4QOJUGCBlCTnf--QY_pX3RbvQ8B4Sv6ab44PaeTL1KQt7EUaO-ANzv0e2g0HM5z0XKXEXHllMiuslT5gtjk9VOI4hvKQC6k_MUBrgd3EQsnDGDC93FPuWeNmT_RXFi3R7acWgnO2wJ2BBft8wy_uEmAiveX8iPMHjIFAXNwDIjluxBmmtV4dx4-NK5mO9KacDX37-Lsmwg9rO0u7hVcaL9-Afl6-eLwvEV83wnG7AYt4YBuZI86bQdIMhDHhOJ86Ct7Gehx5NP_rmsLLQh14kJOOUEZMLNt3fpTkQnmNYZoY2HQ_UiIAScUYQRs2q57uIHY30S7fMBBzEHoB-faS16VccLQYpq7jbFDpabwKyId6rt7LMYzYI88faIlDYRPIw-RqtpuZs27GhzoSN9R8X2RXRx2mLkkow5190nLY3IzeXjv_mh3t2rjTjgI');
        angular.module('winemakingApp').constant("ApiUrl", "http://localhost:60251/api/");
    }

}());
