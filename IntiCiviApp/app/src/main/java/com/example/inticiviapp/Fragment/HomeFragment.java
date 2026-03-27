package com.example.inticiviapp.Fragment;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.example.inticiviapp.Adapter.SliderAdapter;
import com.example.inticiviapp.R;

import java.util.Arrays;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class HomeFragment extends Fragment {
    private View homeView;
    View report;

    private Handler handler;
    private Runnable runnable;
    LinearLayout dotsLayout;
    ImageView[] dots;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        homeView = inflater.inflate(R.layout.fragment_home, container, false);
        //slider
        ViewPager2 viewPager = homeView.findViewById(R.id.viewPager);
        report = homeView.findViewById(R.id.report_civic_issue);
        dotsLayout = homeView.findViewById(R.id.dotsLayout);
        //3 Images for slider
        List<Integer> images = Arrays.asList(
                R.drawable.slide1,
                R.drawable.slide2,
                R.drawable.slide3
        );
        SliderAdapter adapter = new SliderAdapter(images);
        viewPager.setAdapter(adapter);
        setupDots(images.size());

        // Auto Slide
        handler = new Handler(Looper.getMainLooper());
        runnable = new Runnable() {
            int currentPage = 0;

            @Override
            public void run() {
                if (currentPage == images.size()) currentPage = 0;
                viewPager.setCurrentItem(currentPage++, true);
                handler.postDelayed(this, 3000); // 3 sec
            }
        };
        handler.post(runnable);
        // Animation Slider
        viewPager.setPageTransformer((page, position) -> {
            page.setAlpha(0.5f + (1 - Math.abs(position)));
        });
        viewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);

                for (int i = 0; i < dots.length; i++) {
                    dots[i].setImageResource(R.drawable.dot_inactive);
                }

                dots[position].setImageResource(R.drawable.dot_active);
            }
        });


        report.setOnClickListener(v -> {
            Toast.makeText(getContext(), "Report Clicked", Toast.LENGTH_SHORT).show();
        });

        return homeView;
    }
    private void setupDots(int count) {
        dots = new ImageView[count];
        dotsLayout.removeAllViews();

        for (int i = 0; i < count; i++) {
            dots[i] = new ImageView(getContext());

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    20, 20);
            params.setMargins(6, 0, 6, 0);

            dots[i].setLayoutParams(params);
            dots[i].setImageResource(R.drawable.dot_inactive);

            dotsLayout.addView(dots[i]);
        }

        dots[0].setImageResource(R.drawable.dot_active);
    }
}

