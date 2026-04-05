package com.example.inticiviapp.Authentication;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;

public class GenericTextWatcher implements TextWatcher {

    private View currentView;
    private View nextView;

    public GenericTextWatcher(View currentView, View nextView) {
        this.currentView = currentView;
        this.nextView = nextView;
    }

    @Override
    public void afterTextChanged(Editable editable) {
        if (editable.length() == 1 && nextView != null) {
            nextView.requestFocus();
        }
    }

    @Override public void beforeTextChanged(CharSequence s, int start, int count, int after) {}
    @Override public void onTextChanged(CharSequence s, int start, int before, int count) {}
}
