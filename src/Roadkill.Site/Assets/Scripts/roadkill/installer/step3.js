var Roadkill;
(function (Roadkill) {
    (function (Site) {
        /// <reference path="../typescript-ref/installerconstants.ts" />
        (function (Installer) {
            var Step3WindowsAuthMessages = (function () {
                function Step3WindowsAuthMessages() {
                }
                return Step3WindowsAuthMessages;
            })();
            Installer.Step3WindowsAuthMessages = Step3WindowsAuthMessages;

            var Step3 = (function () {
                function Step3(wizard, messages) {
                    this._wizard = wizard;
                    this._messages = messages;

                    // Set the page number in the header
                    this._wizard.updateNavigation(3);
                }
                Step3.prototype.configureDatabaseAuthValidation = function () {
                    // Form validation
                    var validationRules = {
                        EditorRoleName: {
                            required: true
                        },
                        AdminRoleName: {
                            required: true
                        },
                        AdminEmail: {
                            required: true
                        },
                        AdminPassword: {
                            required: true
                        },
                        password2: {
                            required: true,
                            equalTo: "#AdminPassword",
                            messages: {
                                equalTo: ""
                            }
                        }
                    };

                    var validation = new Roadkill.Site.Validation();
                    validation.Configure("#step3-form", validationRules);

                    var rules = $("#password2").rules();
                    rules.messages.equalTo = "The passwords don't match";
                    $("#password2").rules("add", rules);
                };

                Step3.prototype.configureWindowsAuthValidation = function () {
                    // Form validation
                    var validationRules = {
                        LdapConnectionString: {
                            required: true
                        },
                        LdapUsername: {
                            required: true
                        },
                        LdapPassword: {
                            required: true
                        }
                    };

                    var validation = new Roadkill.Site.Validation();
                    validation.Configure("#step3-form", validationRules);
                };

                Step3.prototype.bindWindowsAuthButtons = function () {
                    var _this = this;
                    $("#testldap").click(function (e) {
                        _this.testActiveDirectory("");
                    });

                    $("#testeditor").click(function (e) {
                        _this.testActiveDirectory($("#EditorRoleName").val());
                    });

                    $("#testadmin").click(function (e) {
                        _this.testActiveDirectory($("#AdminRoleName").val());
                    });
                };

                Step3.prototype.testActiveDirectory = function (groupName) {
                    var _this = this;
                    var url = ROADKILL_INSTALLER_TESTLDAP_URL;
                    var jsonData = {
                        "connectionstring": $("#LdapConnectionString").val(),
                        "username": $("#LdapUsername").val(),
                        "password": $("#LdapPassword").val(),
                        "groupName": groupName
                    };

                    this._wizard.makeAjaxRequest(url, jsonData, function (data) {
                        _this.OnTestLdapSuccess(data);
                    });
                };

                Step3.prototype.OnTestLdapSuccess = function (data) {
                    if (data.Success) {
                        this._wizard.showSuccess(this._messages.successTitle, this._messages.successMessage);
                    } else {
                        this._wizard.showFailure(this._messages.failureTitle, this._messages.failureMessage + "\n" + data.ErrorMessage);
                    }
                };
                return Step3;
            })();
            Installer.Step3 = Step3;
        })(Site.Installer || (Site.Installer = {}));
        var Installer = Site.Installer;
    })(Roadkill.Site || (Roadkill.Site = {}));
    var Site = Roadkill.Site;
})(Roadkill || (Roadkill = {}));