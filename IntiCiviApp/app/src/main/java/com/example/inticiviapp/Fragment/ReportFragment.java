package com.example.inticiviapp.Fragment;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import com.example.inticiviapp.R;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.MaterialAutoCompleteTextView;
import com.google.android.material.textfield.TextInputEditText;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class ReportFragment extends Fragment {

    View ReportView;

    //Location
    FusedLocationProviderClient fusedLocationClient;

    // UI fields
    MaterialAutoCompleteTextView dropdownState;
    TextInputEditText etCity, etPin, etAddress;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        ReportView = inflater.inflate(R.layout.fragment_report, container, false);

        // ================= TIME DROPDOWN =================
        MaterialAutoCompleteTextView dropdownTime = ReportView.findViewById(R.id.dropdownTime);

        String[] timeOptions = {
                "Any time",
                "Morning (9 AM - 12 PM)",
                "Afternoon (12 PM - 3 PM)",
                "Evening (3 PM - 6 PM)",
                "Night (6 PM - 9 PM)"
        };

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                requireContext(),
                android.R.layout.simple_dropdown_item_1line,
                timeOptions
        );

        dropdownTime.setAdapter(adapter);


        // ================= STATE DROPDOWN =================
        dropdownState = ReportView.findViewById(R.id.dropdownState);

        String[] states = {
                "Andhra Pradesh",
                "Telangana",
                "Tamil Nadu",
                "Karnataka",
                "Maharashtra"
        };

        ArrayAdapter<String> stateAdapter = new ArrayAdapter<>(
                requireContext(),
                android.R.layout.simple_dropdown_item_1line,
                states
        );

        dropdownState.setAdapter(stateAdapter);


        // ================= INPUT FIELDS =================
        etCity = ReportView.findViewById(R.id.etCity);
        etPin = ReportView.findViewById(R.id.etPin);
        etAddress = ReportView.findViewById(R.id.etAddress);


        // ================= LOCATION =================
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireContext());

        MaterialButton btnLocation = ReportView.findViewById(R.id.btnLocation);

        btnLocation.setOnClickListener(v -> getCurrentLocation());


        return ReportView;
    }


    // ================= GET LOCATION =================
    private void getCurrentLocation() {

        if (ActivityCompat.checkSelfPermission(requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            return;
        }

        fusedLocationClient.getLastLocation().addOnSuccessListener(location -> {
            if (location != null) {

                double lat = location.getLatitude();
                double lon = location.getLongitude();

                Geocoder geocoder = new Geocoder(requireContext(), Locale.getDefault());

                try {
                    List<Address> addresses = geocoder.getFromLocation(lat, lon, 1);

                    if (addresses != null && !addresses.isEmpty()) {

                        Address addr = addresses.get(0);

                        String state = addr.getAdminArea();
                        String city = addr.getLocality();
                        String pin = addr.getPostalCode();
                        String fullAddress = addr.getAddressLine(0);

                        // AUTO FILL
                        dropdownState.setText(state, false);
                        etCity.setText(city);
                        etPin.setText(pin);
                        etAddress.setText(fullAddress);

                        Toast.makeText(getContext(), "Location Auto-filled", Toast.LENGTH_SHORT).show();
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }

            } else {
                Toast.makeText(getContext(), "Unable to get location", Toast.LENGTH_SHORT).show();
            }
        });
    }


    // ================= PERMISSION RESULT =================
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == 1 && grantResults.length > 0 &&
                grantResults[0] == PackageManager.PERMISSION_GRANTED) {

            getCurrentLocation();
        }
    }
}