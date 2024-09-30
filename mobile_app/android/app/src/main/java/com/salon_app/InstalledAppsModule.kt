package com.salon_app

import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ResolveInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.Arguments

class InstalledAppsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "InstalledApps"
    }

    @ReactMethod
    fun getInstalledApplications(successCallback: Callback, errorCallback: Callback) {
        try {
            val pm = reactApplicationContext.packageManager
            val apps = pm.queryIntentActivities(Intent(Intent.ACTION_MAIN, null), 0)
            val array: WritableArray = Arguments.createArray()

            for (app in apps) {
                array.pushString(app.activityInfo.packageName)
            }

            successCallback.invoke(array)
        } catch (e: Exception) {
            errorCallback.invoke(e.message)
        }
    }
}
