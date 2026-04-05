package com.example.inticiviapp;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.inticiviapp.Authentication.SessionManager;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.auth.PhoneAuthProvider;

import java.util.concurrent.TimeUnit;

public class LoginActivity extends AppCompatActivity {

    Button btnContinue,btn_google;
    EditText etPhone;
    String phoneNumber;
    GoogleSignInClient googleSignInClient;
    FirebaseAuth firebaseAuth;
    int RC_SIGN_IN = 100;
    String name,email,uid;

    PhoneAuthProvider.OnVerificationStateChangedCallbacks callbacks;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        etPhone = findViewById(R.id.et_phone);
        btnContinue = findViewById(R.id.btn_continue);

        //Initialize callbacks
        callbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(com.google.firebase.auth.PhoneAuthCredential credential) {
                // Auto verification (rare case)
                Toast.makeText(LoginActivity.this, "Auto Verified", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {
                Toast.makeText(LoginActivity.this, "Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
            }

            @Override
            public void onCodeSent(String verificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {

                super.onCodeSent(verificationId, token);

                Toast.makeText(LoginActivity.this, "OTP Sent", Toast.LENGTH_SHORT).show();

                //OPEN OTP SCREEN HERE (correct place)
                Intent intent = new Intent(LoginActivity.this, OTPScreen.class);
                intent.putExtra("verificationId", verificationId);
                intent.putExtra("phone", phoneNumber);
                startActivity(intent);
            }
        };

        btnContinue.setOnClickListener(v -> {

            String input = etPhone.getText().toString().trim();

            if (input.isEmpty() || input.length() < 10) {
                etPhone.setError("Enter valid phone number");
                return;
            }

            phoneNumber = "+91" + input;

            // CALL FIREBASE OTP
            PhoneAuthProvider.getInstance().verifyPhoneNumber(
                    phoneNumber,
                    60,
                    TimeUnit.SECONDS,
                    this,
                    callbacks
            );
        });

        btn_google = findViewById(R.id.btn_google);
        firebaseAuth = FirebaseAuth.getInstance();
        // 🔹 Configure Google Sign In
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        googleSignInClient = GoogleSignIn.getClient(this, gso);

        btn_google.setOnClickListener(v -> signIn());
    }

    private void signIn() {
        Intent signInIntent = googleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);

            try {
                GoogleSignInAccount account = task.getResult(ApiException.class);
                firebaseAuthWithGoogle(account);
            } catch (ApiException e) {
                Toast.makeText(this, "Google Sign-In Failed", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private void firebaseAuthWithGoogle(GoogleSignInAccount account) {

        AuthCredential credential = GoogleAuthProvider.getCredential(account.getIdToken(), null);

        firebaseAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, task -> {

                    if (task.isSuccessful()) {
                        FirebaseUser user = firebaseAuth.getCurrentUser();
                        // SAVE SESSION
                        SessionManager session = new SessionManager(this);
                        session.setLogin(true);
                        session.saveUser(user.getEmail());
                        Toast.makeText(this, "Login Success", Toast.LENGTH_SHORT).show();
                        //  OPEN REPORT SCREEN
                        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                        intent.putExtra("openFragment", "report");
                        intent.putExtra("name", user.getDisplayName());
                        intent.putExtra("email", user.getEmail());
                        intent.putExtra("uid", user.getUid());
                        startActivity(intent);
                        finish();

                    } else {
                        Toast.makeText(this, "Authentication Failed", Toast.LENGTH_SHORT).show();
                    }
                });
    }
}