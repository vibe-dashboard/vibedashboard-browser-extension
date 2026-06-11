import "webext-dynamic-content-scripts";

import addDomainPermissionToggle from "webext-permission-toggle";

(async () => {
    addDomainPermissionToggle();
})();

export {};
