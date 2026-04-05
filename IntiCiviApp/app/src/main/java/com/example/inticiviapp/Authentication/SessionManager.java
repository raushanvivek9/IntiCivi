package com.example.inticiviapp.Authentication;

import android.content.Context;
import android.content.SharedPreferences;

public class SessionManager {
    private static final String PREF_NAME = "UserSession";
    private static final String KEY_LOGIN = "isLoggedIn";

    SharedPreferences pref;
    SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        pref = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = pref.edit();
    }
    public void setLogin(boolean isLoggedIn) {
        editor.putBoolean(KEY_LOGIN, isLoggedIn);
        editor.apply();
    }

    public boolean isLoggedIn() {
        return pref.getBoolean(KEY_LOGIN, false);
    }

    public void logout() {
        editor.clear();
        editor.apply();
    }
    public void saveUser(String phone) {
        editor.putString("phone", phone);
        editor.apply();
    }

    public String getPhone() {
        return pref.getString("phone", "");
    }
}
