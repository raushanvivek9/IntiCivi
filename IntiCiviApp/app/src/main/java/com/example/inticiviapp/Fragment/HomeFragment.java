package com.example.inticiviapp.Fragment;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.inticiviapp.Adapter.NoticeAdapter;
import com.example.inticiviapp.Adapter.ResourceAdapter;
import com.example.inticiviapp.Adapter.SliderAdapter;
import com.example.inticiviapp.Model.Notice;
import com.example.inticiviapp.Model.Resource;
import com.example.inticiviapp.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class HomeFragment extends Fragment {
    View report;

    private Handler handler;
    LinearLayout dotsLayout;
    ImageView[] dots;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View homeView = inflater.inflate(R.layout.fragment_home, container, false);
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
        // 3 sec
        Runnable runnable = new Runnable() {
            int currentPage = 0;

            @Override
            public void run() {
                if (currentPage == images.size()) currentPage = 0;
                viewPager.setCurrentItem(currentPage++, true);
                handler.postDelayed(this, 3000); // 3 sec
            }
        };
        handler.post(runnable);
        // ==================Animation Slider==========================
        viewPager.setPageTransformer((page, position) -> page.setAlpha(0.5f + (1 - Math.abs(position))));
        viewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);

                for (ImageView dot : dots) {
                    dot.setImageResource(R.drawable.dot_inactive);
                }

                dots[position].setImageResource(R.drawable.dot_active);
            }
        });

        //=============for Offical Notice Board=========================
        RecyclerView noticerecyclerView = homeView.findViewById(R.id.noticeRecycler);
        noticerecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Dummy Data (Later API)
        List<Notice> Noticelist = new ArrayList<>();
        Noticelist.add(new Notice("18","MAR","System maintenance scheduled","Issued by IT Dept","IMPORTANT"));
        Noticelist.add(new Notice("15","MAR","Urban Flooding complaints accepted","Issued by PWD","NEW"));
        Noticelist.add(new Notice("10","MAR","Complaint SLA updated","Issued by Admin","UPDATED"));

        List<Notice> NoticelimitedList;
        // show only 4
        if (Noticelist.size() > 4) {
            NoticelimitedList = Noticelist.subList(0, 4);
        } else {
            NoticelimitedList = Noticelist;
        }

        NoticeAdapter noticeadapter = new NoticeAdapter(NoticelimitedList);
        noticerecyclerView.setAdapter(noticeadapter);

        TextView notice_viewMore = homeView.findViewById(R.id.notice_viewMore);

        notice_viewMore.setOnClickListener(v -> {
            getParentFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, new NoticeFragment())
                    .addToBackStack(null)
                    .commit();
        });


        //Important link and Resources
        RecyclerView resource_recyclerView = homeView.findViewById(R.id.resourceRecycler);
        resource_recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        List<Resource> Resourcelist = new ArrayList<>();

        Resourcelist.add(new Resource("Citizen Complaint User Manual",
                "PDF • 2.4 MB • Updated Mar 2026", "PDF"));

        Resourcelist.add(new Resource("Complaint SLA Guidelines 2026",
                "DOC • 1.1 MB • Admin Circular", "DOC"));

        Resourcelist.add(new Resource("Monthly Grievance Report – Feb 2026",
                "XLS • 3.8 MB • Public Record", "XLS"));

        Resourcelist.add(new Resource("RTI Application Form (Form A)",
                "PDF • 180 KB • Govt. of AP", "PDF"));

        Resourcelist.add(new Resource("API Documentation for Developers",
                "Link • Open Data Portal", "LINK"));

        List<Resource> limitedList;

        // show only 4
        if (Resourcelist.size() > 4) {
            limitedList = Resourcelist.subList(0, 4);
        } else {
            limitedList = Resourcelist;
        }

        ResourceAdapter Resource_adapter = new ResourceAdapter(limitedList);
        resource_recyclerView.setAdapter(Resource_adapter);
        //Resource viewMore
        TextView resource_viewMore = homeView.findViewById(R.id.resource_viewMore);

        resource_viewMore.setOnClickListener(v -> {
            getParentFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, new ResourceFragment())
                    .addToBackStack(null)
                    .commit();
        });

        //Stat
        View totalCard = homeView.findViewById(R.id.card_total);
        ((TextView) totalCard.findViewById(R.id.value)).setText("12,034");
        ((TextView) totalCard.findViewById(R.id.title)).setText("Total Complaints");

        View resolvedCard = homeView.findViewById(R.id.card_resolved);
        ((TextView) resolvedCard.findViewById(R.id.value)).setText("10,200");
        ((TextView) resolvedCard.findViewById(R.id.title)).setText("Resolved");

        View pendingCard = homeView.findViewById(R.id.card_pending);
        ((TextView) pendingCard.findViewById(R.id.value)).setText("834");
        ((TextView) pendingCard.findViewById(R.id.title)).setText("Pending");

        View deptCard = homeView.findViewById(R.id.card_department);
        ((TextView) deptCard.findViewById(R.id.value)).setText("25");
        ((TextView) deptCard.findViewById(R.id.title)).setText("Departments");

        //==============Report complain============================
        report.setOnClickListener(v -> {
            ReportFragment fragment = new ReportFragment();

            requireActivity().getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, fragment)
                    .addToBackStack(null) //
                    .commit();
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

