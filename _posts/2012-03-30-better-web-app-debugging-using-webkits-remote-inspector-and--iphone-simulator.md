---
layout: post
title: "Better Web App debugging using WebKit's remote inspector and iPhone Simulator"
category:
tags: []
---
{% include JB/setup %}

Debugging tools like Firebug, and Webkit's Inspector are now considered major assets in any Frontend Engineer's toolbelt when building web applications for desktop. On the mobile front tools are quite limited, Mobile Safari's debug console gives limited access to error and console logs which in many cases fail to be detailed enough to provide useful information.

Not many people know about WebKit's ability to debug remote code. And what even less people know is that you can enable the remote inspector for Mobile Safari for iPhone Simulator in OSX with some minor hacks.

At Onswipe, we're constantly looking for ways to improve our workflows and make our lives a little easier. This time, we came across a private API in iOS that allows you to enable the remote inspector. After getting it to work through a very manual process, we searched the internets and found out a post on [Nathan de Vries' blog](http://atnan.com/blog/2011/11/17/enabling-remote-debugging-via-private-apis-in-mobile-safari/) that mentioned the same private API we came across.

This is how it looks:
![Remote Safari Inspector](http://engineering.onswipe.com.s3.amazonaws.com/img/iosd_s.png)

[HI-RES Image](http://engineering.onswipe.com.s3.amazonaws.com/img/iosd.png)


To make things easier, Cam and Juan got together and wrote a bash script for your debugging pleasure. The script automates the process of launching iPhone Simulator, attaching to the Mobile Safari process to enable the Inspector and launches Safari.

    #!/bin/bash

    # Open iPhone Simulator on default location for XCode 4.3 if found

    [[ -d /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app/ ]] &&
      open /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app

    # Open iPhone Simulator on default location for XCode 4.2 if found
    [[ -d /Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app/ ]] &&
      open /Developer/Platforms/iPhoneSimulator.platform/Developer/Applications/iPhone\ Simulator.app

    # Open mobile safari
    echo Open mobile safari on emulator and press return
    read

    # Plug debug to MobileSafari.app
    echo Debugging
    MobileSafari_PID=$(ps x | grep "MobileSafari" | grep -v grep | awk '{ print $1 }')

    if [ "$MobileSafari_PID" == "" ]; then
      echo "Mobile Safari.app must be running in the Simulator to enable the remote inspector."
      exit
    else

      cat <<EOM | gdb -quiet > /dev/null
      attach $MobileSafari_PID
      p (void *)[WebView _enableRemoteInspector]
      detach
    EOM
    fi

    # Open debugger in Safari.app
    open -a /Applications/Safari.app http://localhost:9999

Save this to a file called `iosd` in your `/usr/local/bin folder` then run this from a terminal window:

    $ cd /usr/local/bin/
    $ chmod a+x iosd
    $ ./iosd


### Credit where credit is due

We couldn't have made this happen without these resources:

- [original bash script gist](https://gist.github.com/2029432)

- [Remote debuggin - code couch](http://www.codecouch.com/2011/11/remote-debugging-mobile-safari-web-apps-that-have-been-added-to-the-home-screen/)
- [Enabling remote debugging - atnan.com](http://atnan.com/blog/2011/11/17/enabling-remote-debugging-via-private-apis-in-mobile-safari/)


Hearts,

**The Onswipe Engineering Team**
