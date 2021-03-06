// ************************************************************************* 
// Copyright (c) 2014-2015, SUSE LLC
// 
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// 
// 1. Redistributions of source code must retain the above copyright notice,
// this list of conditions and the following disclaimer.
// 
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
// 
// 3. Neither the name of SUSE LLC nor the names of its contributors may be
// used to endorse or promote products derived from this software without
// specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
// ************************************************************************* 
//
// mfile-www/daction-start.js
//
// daction 'start' method definitions
//
// shorter daction functions can be included directly (see, e.g.,
// 'demoAction' below); longer ones should be placed in their own
// module and brought in as a dependency (see, e.g. 'logout' below)
//
"use strict";

define ([
    "jquery",
    "current-user",
    "app/emp-lib",
    "html",
    "logout",
    "target"
], function (
    $,
    currentUser,
    empLib,
    html,
    logout,
    target
) {

    // note that action methods called from forms will be called with the form
    // object as the first and only argument

    var act = {

            // demo action from App::MFILE::WWW
            "demoAction": function () {
                $('#mainarea').html(html.demoAction);
                setTimeout(function () { 
                        target.pull('mainMenu').start(); 
                    }, 1500);
            },

            // actions triggered from employee menu
            "empProfileUpdate": empLib.empProfile,
            "passChangePending": empLib.passChangePending,
            "saveChangedPassword": empLib.mainEmpl,
            "newEmplSubmit": empLib.newEmplSubmit,
            "insertEmployee": empLib.insertEmployee,
            "actionEmplSearch": empLib.actionEmplSearch,
            "masqEmployee": empLib.masqEmployee,

            // return to (saved) browser state
            "returnToBrowser": function () { 
                console.log("Now in returnToBrowser daction");
                start.dbrowser(); 
            },  

            // logout action
            "logout": function () {
                // if masquerading, end the masquerade;
                if (currentUser('flag1')) {
                    empLib.endTheMasquerade();
                } else {
                    logout();
                }
            }
        };
   
    return function (a) {
        if (act.hasOwnProperty(a)) {
            return act[a];
        }
        return undefined;
    };

});
