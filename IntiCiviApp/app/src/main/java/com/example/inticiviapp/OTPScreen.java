package com.example.inticiviapp;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.inticiviapp.Authentication.GenericTextWatcher;
import com.example.inticiviapp.Authentication.SessionManager;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

public class OTPScreen extends AppCompatActivity {

    TextView tvTimer, tvResend;
    CountDownTimer timer;

    EditText otp1, otp2, otp3, otp4;
    Button btnVerify;

    String PhoneNumber;
    String verificationId;

    PhoneAuthProvider.ForceResendingToken resendToken;
    PhoneAuthProvider.OnVerificationStateChangedCallbacks callbacks;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_otpscreen);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.otp_screen), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // 🔹 INIT VIEWS
        otp1 = findViewById(R.id.otp1);
        otp2 = findViewById(R.id.otp2);
        otp3 = findViewById(R.id.otp3);
        otp4 = findViewById(R.id.otp4);
        btnVerify = findViewById(R.id.btn_verify);

        tvTimer = findViewById(R.id.tv_timer);
        tvResend = findViewById(R.id.tv_resend);

        // 🔹 GET DATA FROM LOGIN
        PhoneNumber = getIntent().getStringExtra("phone");
        verificationId = getIntent().getStringExtra("verificationId");

        // 🔹 AUTO MOVE OTP
        setupOtpInputs();

        // 🔹 START TIMER
        startTimer();

        // 🔹 VERIFY BUTTON
        btnVerify.setOnClickListener(v -> {
            String code = otp1.getText().toString() +
                    otp2.getText().toString() +
                    otp3.getText().toString() +
                    otp4.getText().toString();

            if (code.length() < 4) {
                Toast.makeText(this, "Enter valid OTP", Toast.LENGTH_SHORT).show();
                return;
            }

            verifyCode(code);
        });

        // 🔹 CALLBACKS FOR RESEND
        callbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                signInWithCredential(credential);
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {
                Toast.makeText(OTPScreen.this, "Error: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCodeSent(String newVerificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {

                verificationId = newVerificationId;
                resendToken = token;

                Toast.makeText(OTPScreen.this, "OTP Resent", Toast.LENGTH_SHORT).show();
            }
        };

        // 🔹 RESEND CLICK
        tvResend.setOnClickListener(v -> {
            resendOtp();
            startTimer();
        });
    }

    // ================= OTP VERIFY =================
    private void verifyCode(String code) {
        PhoneAuthCredential credential =
                PhoneAuthProvider.getCredential(verificationId, code);

        signInWithCredential(credential);
    }

    // ================= SIGN IN =================
    private void signInWithCredential(PhoneAuthCredential credential) {

        FirebaseAuth.getInstance().signInWithCredential(credential)
                .addOnCompleteListener(task -> {

                    if (task.isSuccessful()) {

                        Toast.makeText(this, "Login Success", Toast.LENGTH_SHORT).show();

                        // 🔥 SAVE SESSION
                        SessionManager session = new SessionManager(this);
                        session.setLogin(true);
                        session.saveUser(PhoneNumber);

                        // 🔥 GO TO MAIN / REPORT
                        Intent intent = new Intent(OTPScreen.this, MainActivity.class);
                        intent.putExtra("openFragment", "report");
                        startActivity(intent);
                        finish();

                    } else {
                        Toast.makeText(this, "Invalid OTP", Toast.LENGTH_SHORT).show();
                    }
                });
    }

    // ================= RESEND =================
    private void resendOtp() {
        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                PhoneNumber,
                60,
                TimeUnit.SECONDS,
                this,
                callbacks,
                resendToken
        );
    }

    // ================= TIMER =================
    private void startTimer() {

        tvResend.setVisibility(View.GONE);
        tvTimer.setVisibility(View.VISIBLE);

        timer = new CountDownTimer(30000, 1000) {

            public void onTick(long millisUntilFinished) {
                tvTimer.setText("Resend in " + millisUntilFinished / 1000 + "s");
            }

            public void onFinish() {
                tvTimer.setVisibility(View.GONE);
                tvResend.setVisibility(View.VISIBLE);
            }
        }.start();
    }

    // ================= AUTO MOVE OTP =================
    private void setupOtpInputs() {

        otp1.addTextChangedListener(new GenericTextWatcher(otp1, otp2));
        otp2.addTextChangedListener(new GenericTextWatcher(otp2, otp3));
        otp3.addTextChangedListener(new GenericTextWatcher(otp3, otp4));
    }
}