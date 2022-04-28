# Example of how to use Expo (React Native) with Internet Computer

Example React Native (in Expo) app.

## Canister

Canister is already deployed on canister ID `s5ezz-7yaaa-aaaal-qalmq-cai`. So you can run on device without any localhost issues. Source code for canister is under `ic/Main.mo`

## Start packager

Run Expo packager
```
yarn start
```

## Run iOS app on Simulator
```
yarn ios
```

## Run Android app on Simulator / connected Android device
```
yarn android
```

## Running on iOS real device
Download Expo Go app on iPhone device & once Expo dev tools appear in browser, scan QR code in app on device to test on device.

## Known issue on Android

Due BigInts not being supported on Android JS Engine. A while loop inside `@dfinity/candid` runs infinitely and thus `await actor.get()` in `HomeScreen.tsx` never returns/completes.

Try to tap Run Query/navigate to screen, app is now locked and unresponsive.

Here's the code that runs forever:

```
// From node_modules/@dfinity/candid/lib/cjs/utils/leb128.js
// v0.9.2
while (true) {
    const i = Number(value & BigInt(0x7f));
    value /= BigInt(0x80);
    // this line is never === 0 and 
    // thus while loop above runs forever
    if (value === BigInt(0)) {
        pipe.write([i]);
        break;
    }
    else {
        pipe.write([i | 0x80]);
    }
}
```

Using a simple `bigint` polyfill does not resolve the issue.

*Potential solution: @dfinity JS libraries move to using [JSBI](https://github.com/GoogleChromeLabs/jsbi) so it works in an enviornment that does not support BigInt's natively*

## Expo (React Native) JS Engine when running in Debug

Shake phone, and tap Debug Remote JS, you'll notice the app now works on Android. This is because the JS Engine on Android in Debug mode supports BigInt 🤦‍♂️

But that means normal mode and native builds do not #FunTimes 😉