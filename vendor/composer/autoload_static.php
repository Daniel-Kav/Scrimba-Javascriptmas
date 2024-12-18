<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitcb4c60d4ba0c938e4fdd0f8122b69c05
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Twilio\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Twilio\\' => 
        array (
            0 => __DIR__ . '/..' . '/twilio/sdk/src/Twilio',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitcb4c60d4ba0c938e4fdd0f8122b69c05::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitcb4c60d4ba0c938e4fdd0f8122b69c05::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitcb4c60d4ba0c938e4fdd0f8122b69c05::$classMap;

        }, null, ClassLoader::class);
    }
}
