//constants for development
(function () {
    'use strict';
    var setUp;
    setUp = 'Azure';

    if (setUp === 'Azure') {
        angular.module('winemakingApp').constant("ApiUrl", "https://wineapi.azurewebsites.net/api/");
        angular.module('winemakingApp').constant("UserToken", 'Bearer 1OlJY9YaLjHtr8Fze3-RQ_g32bx6tB0q53wo7Stj-yy9EGGyJXnz30DXPnyVa7pucDu4bNsuq7i4X1RNl7TPIELwpT3VXIsDO5lLXgSlinUWpNU600xskhUH543VX7wRWoHAVci0cpsdyLEJX0bRCtTOA3wxRzrXiszRfFEanpqk1O-PVK6NjpjrSBgbUaBF-5SJN1Dfds8U5Mo4OG7sDMAWE1TuewS2bam5N30LEioDc8tQ53adHk14A8e0OumXv_FiZQeIFl-C3db48zHU7kwyfi3FRK_asF60A8p8hp9VarFREmYAL7SK92UoARGKPnkCn3vUXJ1q3MG8CpZXJjh7Ezx2hoY6mG1K-DKFHTwYuuU0R35Gr6AQ4CC5B0nCvEOIbcEJPN2QtvMBO30DicMVIYT-Gk7FhIFyFlD7fzQbktLfv7bnUe4YSz_XHRIMCte2zIJFs9O-T2M-vuKYD6lDLihcfXdmdXLOeZi501k');
    }

    if (setUp === 'local') {
        angular.module('winemakingApp').constant("UserToken", 'Bearer S9f7m6J4UPWXXnoifehBycHqxxf6ihMhae5JR0MIsLgBW0cV4QOJUGCBlCTnf--QY_pX3RbvQ8B4Sv6ab44PaeTL1KQt7EUaO-ANzv0e2g0HM5z0XKXEXHllMiuslT5gtjk9VOI4hvKQC6k_MUBrgd3EQsnDGDC93FPuWeNmT_RXFi3R7acWgnO2wJ2BBft8wy_uEmAiveX8iPMHjIFAXNwDIjluxBmmtV4dx4-NK5mO9KacDX37-Lsmwg9rO0u7hVcaL9-Afl6-eLwvEV83wnG7AYt4YBuZI86bQdIMhDHhOJ86Ct7Gehx5NP_rmsLLQh14kJOOUEZMLNt3fpTkQnmNYZoY2HQ_UiIAScUYQRs2q57uIHY30S7fMBBzEHoB-faS16VccLQYpq7jbFDpabwKyId6rt7LMYzYI88faIlDYRPIw-RqtpuZs27GhzoSN9R8X2RXRx2mLkkow5190nLY3IzeXjv_mh3t2rjTjgI');
        angular.module('winemakingApp').constant("ApiUrl", "http://localhost:60251/api/");
    }

}());
