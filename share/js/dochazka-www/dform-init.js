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
// app/dform-init.js
//
// Round one of dform initialization (called from app/target-init)
//
"use strict";

define ([
    'current-user',
    'app/emp-lib',
    'app/prototypes',
    'target'
], function (
    currentUser,
    empLib,
    prototypes,
    target
) {

    //
    // first, we define all entries
    //
    var entries = {        

        // Employee profile - nick
        'ePnick': {
            name: 'ePnick',
            aclProfileRead: 'passerby',
            aclProfileWrite: null,
            text: 'Nick',
            prop: 'nick',
            maxlen: 20
        },
        // Employee profile - EID
        'ePeid': {
            name: 'ePeid',
            aclProfileRead: 'passerby',
            aclProfileWrite: null,
            text: 'EID',
            prop: 'eid',
            maxlen: 8
        },
        // Employee profile - full name
        'ePfullname': {
            name: 'ePfullname',
            aclProfileRead: 'passerby',
            aclProfileWrite: 'active',
            text: 'Full name',
            prop: 'fullname',
            maxlen: 55
        },
        // Employee profile - email
        'ePemail': {
            name: 'ePemail',
            aclProfileRead: 'passerby',
            aclProfileWrite: 'active',
            text: 'Email',
            prop: 'email',
            maxlen: 55
        },
        // Employee profile - remark
        'ePremark': {
            name: 'ePremark',
            aclProfileRead: 'admin',
            aclProfileWrite: 'admin',
            text: 'Remark',
            prop: 'remark',
            maxlen: 55
        },

        // change password
        'newPass': {
            name: 'newPass',
            aclProfileWrite: 'passerby',
            text: 'Password',
            prop: 'passhash',
            maxlen: 32
        },
        'confirmPass': {
            name: 'confirmPass',
            aclProfileRead: 'passerby',
            text: 'Password',
            prop: 'passhash',
            maxlen: 32
        },
        
        // new employee - nick
        'nEnick': {
            name: 'nEnick',
            aclProfileRead: null,
            aclProfileWrite: 'admin',
            text: 'Nick (*)',
            prop: 'nick',
            maxlen: 20
        },
        // new employee - full name
        'nEfullname': {
            name: 'nEfullname',
            aclProfileRead: null,
            aclProfileWrite: 'admin',
            text: 'Full name',
            prop: 'fullname',
            maxlen: 55
        },
        // new employee - email
        'nEemail': {
            name: 'nEemail',
            aclProfileRead: null,
            aclProfileWrite: 'admin',
            text: 'Email',
            prop: 'email',
            maxlen: 55
        },
        // new employee - remark
        'nEremark': {
            name: 'nEremark',
            aclProfileRead: null,
            aclProfileWrite: 'admin',
            text: 'Remark',
            prop: 'remark',
            maxlen: 55
        },
    
       // search employee - nick
        'sEnick': {
            name: 'sEnick',
            aclProfileRead: null,
            aclProfileWrite: 'admin',
            text: 'Nick',
            prop: 'searchKeyNick',
            maxlen: 20
        }
    };
    
    //
    // second, we define the dforms themselves
    //
    return function () {

        target.push('empProfile', {
            'name': 'empProfile',
            'type': 'dform',
            'menuText': 'My profile',
            'title': 'My profile',
            'preamble': null,
            'aclProfile': 'passerby',
            'entriesRead': [entries.ePnick, entries.ePeid, entries.ePfullname, entries.ePemail, entries.ePremark],
            'entriesWrite': [],
            'hook': function () { return currentUser('obj'); },
            'miniMenu': {
                entries: ['empProfileEdit'],
                back: ['Back', 'mainEmpl']
            }
        });

        target.push('empProfileEdit', {
            'name': 'empProfileEdit',
            'type': 'dform',
            'menuText': 'Edit',
            'title': 'Edit employee profile',
            'preamble': null,
            'aclProfile': 'active',
            'entriesRead': [entries.ePnick, entries.ePeid],
            'entriesWrite': [entries.ePfullname, entries.ePemail, entries.ePremark],
            'hook': function () { return currentUser('obj'); },
            'miniMenu': {
                entries: ['empProfileUpdate'],
                back: ['Back to employee menu', 'mainEmpl']
            }
        });

        target.push('changePassword', {
            'name': 'changePassword',
            'type': 'dform',
            'menuText': 'Change my password',
            'title': 'Change my password',
            'preamble': 'Enter new password in the field below',
            'aclProfile': 'passerby',
            'entriesRead': [],
            'entriesWrite': [entries.newPass],
            'hook': function () { return currentUser('obj'); },
            'miniMenu': {
                entries: ['passChangePending'],
                back: ['Back', 'mainEmpl']
            }
        });

        target.push('confirmPassword', {
            'name': 'confirmPassword',
            'type': 'dform',
            'title': 'NEW PASSWORD PENDING!',
            'preamble': 'Check password and confirm that you really want it',
            'aclProfile': 'passerby',
            'entriesRead': [entries.confirmPass],
            'hook': empLib.getEmployeeObject,
            'miniMenu': {
                entries: ['saveChangedPassword'],
                back: ['Back', 'mainEmpl']
            }
        });

        target.push('newEmployee', {
            'name': 'newEmployee',
            'type': 'dform',
            'menuText': 'New employee',
            'title': 'New employee',
            'preamble': 'Fields marked (*) are required, others are optional.',
            'aclProfile': 'admin',
            'entriesRead': null,
            'entriesWrite': [entries.nEnick, entries.nEfullname, entries.nEemail, entries.nEremark],
            'hook': function () { return Object.create(prototypes.empProfile); },
            'miniMenu': {
                entries: ['newEmplSubmit'],
                back: ['Back', 'mainEmpl']
            }
        });

        target.push('dispEmployee', {
            'name': 'dispEmployee',
            'type': 'dform',
            'menuText': 'Employee profile',
            'title': 'Employee profile',
            'preamble': null,
            'aclProfile': 'admin',
            'entriesRead': [entries.ePnick, entries.ePeid, entries.ePfullname, entries.ePemail, entries.ePremark],
            'entriesWrite': [],
            'hook': empLib.getEmployeeObject,
            'miniMenu': {
                entries: [],
                back: ['To leave this page, press ENTER or click the Submit button', 'mainEmpl']
            }
        });
  
        target.push('searchEmployee', {
            'name': 'searchEmployee',
            'type': 'dform',
            'menuText': 'Search employee',
            'title': 'Search employee',
            'preamble': 'Enter search key, % is wildcard',
            'aclProfile': 'admin',
            'entriesRead': null,
            'entriesWrite': [entries.sEnick],
            'hook': function () { return { searchKeyNick: null }; },
            'miniMenu': {
                entries: ['actionEmplSearch'],
                back: ['Back', 'mainEmpl']
            }
        });

        target.push('searchEmpNothingFound', {
            'name': 'searchEmpNothingFound',
            'type': 'dform',
            'menuText': 'Employee profile',
            'title': 'Search employee - results',
            'preamble': 'Your search found 0 employees',
            'aclProfile': 'admin',
            'hook': function () { },
            'miniMenu': {
                entries: [],
                back: ['To leave this page, press ENTER or click the Submit button', 'mainEmpl']
            }
        });

    };
    
});
