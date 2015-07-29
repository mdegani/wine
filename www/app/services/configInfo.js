//constants for development
(function () {
    'use strict';
    var setUp;
    setUp = 'Azure';

    if (setUp === 'Azure') {
        angular.module('winemakingApp').constant("ApiUrl", "https://wineapi.azurewebsites.net/api/");
        angular.module('winemakingApp').constant("UserToken", 'Bearer ogcXZFwYTN7sfsboIXWWemgCs_hvmLtUZ9DpY-cXTepQs8riUy3aQkKwKG5y-weWotLjAcvQSeiAoMVVwbU80CI5Lb3pc4poSZiNPlUvXvLtsgiJKsWQxhMbUinxcY7ec-9re-x1SM9L6LTCje7oG7yO9FtFhR2saYLHqPKZEf_WmIu6_J18KzkCTdYf2vIFPH88bR2sqQLR6n5kaB8LP0imf-bXpqolllfROyIKe2VZb3DfDB5Pn7B7HC7sc-J4yaqGw3qJPRNJ0-zyeWsfhO-O_DTOn4Zc_c67e1sZBF2-dDeD8L-ALJAQkmyr1wK2hEgGBqlXsrn0x_7k8w_ngogsdnlWjhB0Mo9F5FALQN9e_wT8DxRzb67DYVVQoCcDQ5MXfURfIRmKZ0kvRk8DF4ui8JUUjXDG3uRXITbkWJdmuXDWjp5W6iIQJ8_7z_DLnodaA4RFDrQZOyqHdsSnHNbp1KX-gfOeLgHe7wJs9tA');
    }

    if (setUp === 'local') {
        angular.module('winemakingApp').constant("UserToken", 'Bearer S9f7m6J4UPWXXnoifehBycHqxxf6ihMhae5JR0MIsLgBW0cV4QOJUGCBlCTnf--QY_pX3RbvQ8B4Sv6ab44PaeTL1KQt7EUaO-ANzv0e2g0HM5z0XKXEXHllMiuslT5gtjk9VOI4hvKQC6k_MUBrgd3EQsnDGDC93FPuWeNmT_RXFi3R7acWgnO2wJ2BBft8wy_uEmAiveX8iPMHjIFAXNwDIjluxBmmtV4dx4-NK5mO9KacDX37-Lsmwg9rO0u7hVcaL9-Afl6-eLwvEV83wnG7AYt4YBuZI86bQdIMhDHhOJ86Ct7Gehx5NP_rmsLLQh14kJOOUEZMLNt3fpTkQnmNYZoY2HQ_UiIAScUYQRs2q57uIHY30S7fMBBzEHoB-faS16VccLQYpq7jbFDpabwKyId6rt7LMYzYI88faIlDYRPIw-RqtpuZs27GhzoSN9R8X2RXRx2mLkkow5190nLY3IzeXjv_mh3t2rjTjgI');
        angular.module('winemakingApp').constant("ApiUrl", "http://localhost:60251/api/");
    }

}());
