#!/usr/bin/perl
use 5.012000; # CPAN Testers
use strict;
use warnings FATAL => 'all';
use Module::Build 0.37;

my $build = Module::Build->new(
    module_name        => 'App::Dochazka::WWW',
    dist_author        => q{Smithfarm <presnypreklad@gmail.com>},
    dist_abstract      => 'Dochazka ATT system web client',
    dist_version_from  => 'lib/App/Dochazka/WWW.pm',
    license            => 'bsd',
    create_license     => 0,
    create_readme      => 1,
    share_dir          => {
        dist => [ 'share' ],
    },
    script_files       => [
        'bin/dochazka-www',
    ],
    configure_requires => {
        'Module::Build'      => 0.37,
        'Software::License'  => 0,
    },
    build_requires     => { 
        'Test::Fatal'        => 0,
        'Params::Validate'   => 1.06,
    },
    requires           => {
        'perl'               => 5.012,
        'App::CELL'          => 0.196,
        'App::MFILE::WWW'    => 0.134,
        'App::Dochazka::REST' => 0.185,
    },
    meta_merge => {
        resources => {
            homepage => 'https://sourceforge.net/projects/dochazka/',
            repository => 'https://sourceforge.net/p/dochazka/code/',
        }
    },
    add_to_cleanup     => [ 'App-Dochazka-WWW-*' ],
);

$build->create_build_script;
