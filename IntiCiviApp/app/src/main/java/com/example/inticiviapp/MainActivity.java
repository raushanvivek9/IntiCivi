package com.example.inticiviapp;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.bumptech.glide.Glide;
import com.example.inticiviapp.Authentication.SessionManager;
import com.example.inticiviapp.Fragment.HomeFragment;
import com.example.inticiviapp.Fragment.ReportFragment;
import com.example.inticiviapp.Fragment.TrackFragment;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.bottomsheet.BottomSheetDialog;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class MainActivity extends AppCompatActivity {
    DrawerLayout drawerLayout;
    NavigationView navigationView;
    MaterialToolbar toolbar;
    String name,email,uid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);

        setContentView(R.layout.activity_main);

        // Force status bar color
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.setStatusBarColor(getResources().getColor(R.color.blue));
        }

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.drawer_layout), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        drawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);
        Menu menu = navigationView.getMenu();

        SessionManager session = new SessionManager(this);
        //==================get name from logi  activity================
        name = getIntent().getStringExtra("name");
        email = getIntent().getStringExtra("email");
        uid = getIntent().getStringExtra("uid");
        Toast.makeText(this, "name:"+name+" email:"+email+" uid:"+uid, Toast.LENGTH_SHORT).show();
        
        toolbar = findViewById(R.id.toolbar);
        //Action bar
        setSupportActionBar(toolbar);
        // Hamburger icon
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawerLayout, toolbar,
                R.string.open, R.string.close);

        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();

        // Default screen
        loadFragment(new HomeFragment());

        // Menu click
        navigationView.setNavigationItemSelectedListener(item -> {

            int id = item.getItemId();

            if (id == R.id.nav_home) {
                loadFragment(new HomeFragment());
            } else if (id == R.id.nav_report) {
                loadFragment(new ReportFragment());
            } else if (id == R.id.nav_track) {
                loadFragment(new TrackFragment());
            }else if (id == R.id.nav_Profile) {
                showProfileBottomSheet();
            }

            drawerLayout.closeDrawers();
            return true;
        });
    }



    private void loadFragment(Fragment fragment) {

        FragmentTransaction transaction = getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_container, fragment);
        if (!(fragment instanceof HomeFragment)) {
            transaction.addToBackStack(null);
        }
        transaction.commit();
    }
    private void showProfileBottomSheet() {

        View view = LayoutInflater.from(this).inflate(R.layout.bottom_sheet_profile, null);

        BottomSheetDialog dialog = new BottomSheetDialog(this);
        dialog.setContentView(view);

        ImageView img = view.findViewById(R.id.img_profile);
        TextView name = view.findViewById(R.id.tv_name);
        TextView email = view.findViewById(R.id.tv_email);
        TextView phone = view.findViewById(R.id.tv_phone);
        TextView address = view.findViewById(R.id.tv_address);
        TextView aadhar = view.findViewById(R.id.tv_aadhar);

        Button btnEdit = view.findViewById(R.id.btn_edit);
        Button btnLogout = view.findViewById(R.id.btn_logout);
        Button btnLogin = view.findViewById(R.id.btn_login);

        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

        if (user != null) {
            btnLogin.setVisibility(View.GONE);
            name.setText(user.getDisplayName());
            email.setText(user.getEmail());

            // 🔥 Profile Image from Google
            if (user.getPhotoUrl() != null) {
                Glide.with(this)
                        .load(user.getPhotoUrl())
                        .circleCrop()
                        .into(img);
            }
            phone.setText("Phone: " +"7562844814");
            aadhar.setText("Aaddhar: " + "876567876545" );
            address.setText("Address: " + "IIT Tirupati, India");

        }else{
            btnLogin.setVisibility(View.VISIBLE);
            btnEdit.setVisibility(View.GONE);
            btnLogout.setVisibility(View.GONE);
        }
        // ✏️ Edit Profile
        btnEdit.setOnClickListener(v -> {
            dialog.dismiss();
//            startActivity(new Intent(this, ProfileActivity.class));
        });

        // 🚪 Logout
        btnLogout.setOnClickListener(v -> {
            FirebaseAuth.getInstance().signOut();
            dialog.dismiss();
            // Google logout
            GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(
                    this,
                    new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN).build()
            );
            googleSignInClient.signOut();

            // Clear session
            SessionManager session = new SessionManager(this);
            session.setLogin(false);

            // Go to Login screen
            Intent intent = new Intent(MainActivity.this, MainActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            Toast.makeText(this, "Logged out", Toast.LENGTH_SHORT).show();
        });
        btnLogin.setOnClickListener(v -> {
            dialog.dismiss();
            startActivity(new Intent(this, LoginActivity.class));
        });

        dialog.show();
    }
}