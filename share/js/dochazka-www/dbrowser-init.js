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
// app/dbrowser-init.js
//
// Round one of dbrowser initialization (called from app/target-init)
//
"use strict";

define ([
    'lib',
    'target'
], function (
    lib,
    target
) {

    //
    // define dbrowser entries here
    //
    var entries = {        

        // Employee profile - nick
        'ePnick': {
            name: 'ePnick',
            aclProfile: 'admin',
            text: 'Nick',
            prop: 'nick',
            maxlen: 20
        },
        // Employee profile - EID
        'ePeid': {
            name: 'ePeid',
            aclProfile: 'admin',
            text: 'EID',
            prop: 'eid',
            maxlen: 8
        },
        // Employee profile - full name
        'ePfullname': {
            name: 'ePfullname',
            aclProfile: 'admin',
            text: 'Full name',
            prop: 'fullname',
            maxlen: 55
        },
        // Employee profile - email
        'ePemail': {
            name: 'ePemail',
            aclProfile: 'admin',
            text: 'Email',
            prop: 'email',
            maxlen: 55
        },
        // Employee profile - remark
        'ePremark': {
            name: 'ePremark',
            aclProfile: 'admin',
            text: 'Remark',
            prop: 'remark',
            maxlen: 55
        },

    };
    
    return function () {
        //
        // push dbrowser object definitions onto 'target' here
        //
        target.push('simpleEmployeeBrowser', {
            'name': 'simpleEmployeeBrowser',
            'type': 'dbrowser',
            'menuText': 'Browse employee search results',
            'title': 'Employee search results',
            'preamble': null,
            'aclProfile': 'admin',
            'entries': [ entries.ePnick, entries.ePeid, entries.ePfullname, entries.ePemail, entries.ePremark ],
            'hook': lib.holdObject,
            'miniMenu': {
                entries: ['masqEmployee'],
                back: ['Back', 'mainEmpl']
            }
        });

    };
    
});
