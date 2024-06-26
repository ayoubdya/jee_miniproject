package com.team4.isamrs.service;

import com.team4.isamrs.model.advertisement.*;
import com.team4.isamrs.model.complaint.Complaint;
import com.team4.isamrs.model.enumeration.ApprovalStatus;
import com.team4.isamrs.model.enumeration.ResponseStatus;
import com.team4.isamrs.model.reservation.Reservation;
import com.team4.isamrs.model.reservation.ReservationReport;
import com.team4.isamrs.model.review.Review;
import com.team4.isamrs.model.user.Administrator;
import com.team4.isamrs.model.user.Advertiser;
import com.team4.isamrs.model.user.Customer;
import com.team4.isamrs.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class TestDataSupplierService {
  @Autowired
  UserRepository userRepository;

  @Autowired
  CustomerRepository customerRepository;

  @Autowired
  ResortAdRepository resortAdRepository;

  @Autowired
  BoatAdRepository boatAdRepository;

  @Autowired
  AdventureAdRepository adventureAdRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PhotoRepository photoRepository;

  @Autowired
  TagRepository tagRepository;

  @Autowired
  ReviewRepository reviewRepository;

  @Autowired
  ReservationRepository reservationRepository;

  @Autowired
  ReservationReportRepository reservationReportRepository;

  @Autowired
  FishingEquipmentRepository fishingEquipmentRepository;

  @Autowired
  ComplaintRepository complaintRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  Random random = new Random();

  String adminEmail = "admin@gmail.com";
  String resortOwnerEmail = "resortowner@gmail.com";
  String fishingInstructorEmail = "fishingowner@gmail.com";
  String boatOwnerEmail = "jetskiowner@gmail.com";
  String customerEmail = "test@gmail.com";

  // String resortOwnerEmail = "lqhlapvekltucfsyiq@nthrw.com";
  // String customerEmail = "unwrhnjzxusichfqip@bvhrk.com";

  @Transactional
  public void injectTestData() {
    createTestAccounts();
    addResorts();
    addBoats();
//    addAdventures();
//    addComplaints();
    addReviews();
  }

  private void createTestAccounts() {
    Administrator administrator = new Administrator();
    administrator.setEnabled(true);
    administrator.setAddress("bd Abdelmoumen, resid. ElHadi 3°et., Grand Casablanca");
    administrator.setCity("Casablanca");
    administrator.setCountryCode("MA");
    administrator.setUsername(adminEmail);
    administrator.setFirstName("Admin");
    administrator.setLastName("Admino");
    administrator.setPassword(passwordEncoder.encode("12345678"));
    administrator.getAuthorities().add(roleRepository.findByName("ROLE_SUPERUSER").get());
    administrator.setPhoneNumber("0611223344");
    userRepository.save(administrator);

    UUID uuid = UUID.randomUUID();
    String originalFilename = "logo.png";
    String storedFilename = "logo.png";
    Photo photo = new Photo(uuid, originalFilename, storedFilename, 1337L, administrator);
    try {
      Path source = Paths.get("uploads-test-data").resolve(originalFilename);
      Path target = Paths.get("uploads").resolve(storedFilename);
      Files.copy(source, target);
      photoRepository.save(photo);
    } catch (IOException e) {
      e.printStackTrace();
    }

    Advertiser resortOwner = new Advertiser();
    resortOwner.setEnabled(true);
    resortOwner.setAddress("3, bd. Bir Anzarane");
    resortOwner.setCity("Fes");
    resortOwner.setCountryCode("MA");
    resortOwner.setUsername(resortOwnerEmail);
    resortOwner.setFirstName("Bilal");
    resortOwner.setLastName("Baka");
    resortOwner.setPassword(passwordEncoder.encode("12345678"));
    resortOwner.getAuthorities().add(roleRepository.findByName("ROLE_RESORT_OWNER").get());
    resortOwner.setPhoneNumber("0622445566");
    resortOwner.setPoints(0);
    userRepository.save(resortOwner);

    UUID uuidSinisa = UUID.randomUUID();
    String originalFilenameSinisa = "sinisa.jpg";
    String storedFilenameSinisa = uuidSinisa + ".jpg";
    Photo sinisaPhoto = new Photo(uuidSinisa, originalFilenameSinisa, storedFilenameSinisa, 1337L, resortOwner);
    try {
      Path source = Paths.get("uploads-test-data").resolve(originalFilenameSinisa);
      Path target = Paths.get("uploads").resolve(storedFilenameSinisa);
      Files.copy(source, target);
      sinisaPhoto = photoRepository.save(sinisaPhoto);
      resortOwner.setAvatar(sinisaPhoto);
    } catch (IOException e) {
      e.printStackTrace();
    }

    Advertiser boatOwner = new Advertiser();
    boatOwner.setEnabled(true);
    boatOwner.setAddress("120-122, avenue Hassan II 20000");
    boatOwner.setCity("Casablanca");
    boatOwner.setCountryCode("MA");
    boatOwner.setUsername(boatOwnerEmail);
    boatOwner.setFirstName("Tarik");
    boatOwner.setLastName("Al-Makki");
    boatOwner.setPassword(passwordEncoder.encode("12345678"));
    boatOwner.getAuthorities().add(roleRepository.findByName("ROLE_BOAT_OWNER").get());
    boatOwner.setPhoneNumber("0622885599");
    boatOwner.setPoints(0);
    userRepository.save(boatOwner);

    UUID uuidDragan = UUID.randomUUID();
    String originalFilenameDragan = "dragan.jpg";
    String storedFilenameDragan = uuidDragan + ".jpg";
    Photo photoDragan = new Photo(uuidDragan, originalFilenameDragan, storedFilenameDragan, 1337L, boatOwner);
    try {
      Path source = Paths.get("uploads-test-data").resolve(originalFilenameDragan);
      Path target = Paths.get("uploads").resolve(storedFilenameDragan);
      Files.copy(source, target);
      photoDragan = photoRepository.save(photoDragan);
      boatOwner.setAvatar(photoDragan);
    } catch (IOException e) {
      e.printStackTrace();
    }

   /* Advertiser fishingInstructor = new Advertiser();
    fishingInstructor.setEnabled(true);
    fishingInstructor.setAddress("Kod mene kući BB");
    fishingInstructor.setCity("Novi Sad");
    fishingInstructor.setCountryCode("RS");
    fishingInstructor.setUsername(fishingInstructorEmail);
    fishingInstructor.setFirstName("Lazar");
    fishingInstructor.setLastName("Dušanić");
    fishingInstructor.setPassword(passwordEncoder.encode("12345678"));
    fishingInstructor.getAuthorities().add(roleRepository.findByName("ROLE_FISHING_INSTRUCTOR").get());
    fishingInstructor.setPhoneNumber("4494358490");
    fishingInstructor.setPoints(0);
    userRepository.save(fishingInstructor);*/
/*
    UUID uuidLazar = UUID.randomUUID();
    String originalFilenameLazar = "lazar.jpg";
    String storedFilenameLazar = uuidLazar + ".jpg";
    Photo lazarPhoto = new Photo(uuidLazar, originalFilenameLazar, storedFilenameLazar, 1337L, fishingInstructor);
    try {
      Path source = Paths.get("uploads-test-data").resolve(originalFilenameLazar);
      Path target = Paths.get("uploads").resolve(storedFilenameLazar);
      Files.copy(source, target);
      lazarPhoto = photoRepository.save(lazarPhoto);
      fishingInstructor.setAvatar(lazarPhoto);
    } catch (IOException e) {
      e.printStackTrace();
    }*/

    Customer customer = new Customer();
    customer.setEnabled(true);
    customer.setAddress("443, bd Oued Oum Errabia");
    customer.setCity("Casablanca");
    customer.setCountryCode("MA");
    customer.setUsername(customerEmail);
    customer.setFirstName("Ayoub");
    customer.setLastName("DYA");
    customer.setPassword(passwordEncoder.encode("12345678"));
    customer.getAuthorities().add(roleRepository.findByName("ROLE_CUSTOMER").get());
    customer.setPhoneNumber("0611112222");
    customer.setPenalties(0);
    customer.setPoints(0);
    userRepository.save(customer);

    UUID uuidStevan = UUID.randomUUID();
    String originalFilenameStevan = "stevan.jpg";
    String storedFilenameStevan = uuidStevan + ".jpg";
    Photo stevanPhoto = new Photo(uuidStevan, originalFilenameStevan, storedFilenameStevan, 1337L, customer);
    try {
      Path source = Paths.get("uploads-test-data").resolve(originalFilenameStevan);
      Path target = Paths.get("uploads").resolve(storedFilenameStevan);
      Files.copy(source, target);
      stevanPhoto = photoRepository.save(stevanPhoto);
      customer.setAvatar(stevanPhoto);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private void addResorts() {
    Advertiser advertiser = (Advertiser) userRepository.findByUsername(resortOwnerEmail).get();

    Tag tag1 = new Tag("TV");
    Tag tag2 = new Tag("Wi-Fi");
    Tag tag3 = new Tag("Air conditioner");

    for (int i = 0; i < 8; i++) {
      ResortAd resort = new ResortAd();
      resort.setAdvertiser(advertiser);
      resort.setTitle("Example Resort " + i);

      Address address = new Address();
      address.setAddress("Example Address " + i);
      address.setCity(i % 2 == 0 ? "Casablanca" : "Mohammedia");
      address.setCountryCode("MA");
      address.setLatitude("33.5731");
      address.setLongitude("-7.5898");
      address.setState("Grand Casablanca");
      address.setPostalCode(i % 2 == 0 ? "21000" : "23000");
      resort.setAddress(address);

      resort.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
          "Maecenas fringilla metus nec justo tempus venenatis. Etiam ut neque eget ipsum.");
      resort.setPricingDescription("200");
      resort.setAvailableAfter(LocalDate.now());
      resort.setAvailableUntil(LocalDate.now().plusMonths(3));
      resort.setRules("No smoking!");
      resort.setCurrency("MAD");
      resort.setNumberOfBeds(Long.toString(i % 3 + 2));
      resort.setCheckOutTime(LocalTime.parse("10:00"));
      resort.setCheckInTime(LocalTime.parse("14:00"));
      resort.setCapacity(i * 2);
      resort.setPricePerDay(BigDecimal.valueOf(100 + i * 5));

      List<Option> options = new ArrayList<>();
      for (int j = 1; j <= 4; j++) {
        Option option = new Option();
        option.setName("Option " + j);
        option.setMaxCount(j);
        option.setAdvertisement(resort);
        option.setDescription("Option description " + j);
        options.add(option);
      }
      resort.setOptions(options);

      int galleryNumber = random.nextInt((4 + 1) - 1) + 1;
      for (int j = 1; j <= 3; j++) {
        UUID uuid = UUID.randomUUID();
        String originalFilename = "r" + galleryNumber + j + ".jpg";
        String storedFilename = uuid + ".jpg";
        Photo photo = new Photo(uuid, originalFilename, storedFilename, 1337L, advertiser);

        try {
          Path source = Paths.get("uploads-test-data").resolve(originalFilename);
          Path target = Paths.get("uploads").resolve(storedFilename);
          Files.copy(source, target);
          resort.addPhoto(photo);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      Collections.shuffle(resort.getPhotos());

      resort.addTag(tag1);
      resort.addTag(tag2);
      resort.addTag(tag3);

      addReservations(resort, customerRepository.findAll());

      photoRepository.saveAll(resort.getPhotos());
      resortAdRepository.save(resort);
      tagRepository.saveAll(resort.getTags());
    }
  }

  private void addBoats() {
    Random random = new Random();

    Advertiser advertiser = (Advertiser) userRepository.findByUsername(boatOwnerEmail).get();

    Tag tag1 = new Tag("Easy Maneuvering");
    Tag tag2 = new Tag("GPS Navigation");
    Tag tag3 = new Tag("Spacious Seating");

    FishingEquipment fe1 = new FishingEquipment("Nets");
    FishingEquipment fe2 = new FishingEquipment("Fishing rods");
    FishingEquipment fe3 = new FishingEquipment("Baits");

    for (int i = 0; i < 8; i++) {
      BoatAd boat = new BoatAd();
      boat.setAdvertiser(advertiser);
      boat.setTitle("Example Jestski " + i);

      Address address = new Address();
      address.setAddress("Example Address " + i);
      address.setCity(i % 2 == 0 ? "Casablanca" : "Mohammedia");
      address.setCountryCode("MA");
      address.setLatitude("33.5145025");
      address.setLongitude("-7.864801");
      address.setState("Grand Casablanca");
      address.setPostalCode(i % 2 == 0 ? "21000" : "23000");
      boat.setAddress(address);

      boat.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
          "Maecenas fringilla metus nec justo tempus venenatis. Etiam ut neque eget ipsum.");
      boat.setPricingDescription("200");
      boat.setAvailableAfter(LocalDate.now());
      boat.setAvailableUntil(LocalDate.now().plusMonths(3));
      boat.setRules("No smoking!");
      boat.setCurrency("MAD");
      boat.setCheckOutTime(LocalTime.parse("10:00"));
      boat.setCheckInTime(LocalTime.parse("14:00"));
      boat.setCapacity(2);
      boat.setPricePerDay(BigDecimal.valueOf(100 + i * 5));

      boat.setBoatType("jetski");
      boat.setBoatLength("3 m");
      boat.setEngineNumber("1");
      boat.setEnginePower("strong");
      boat.setBoatSpeed("fast");
      boat.setCancellationFee(BigDecimal.valueOf(10));

      int galleryNumber = random.nextInt((4 + 1) - 1) + 1;
      for (int j = 1; j <= 3; j++) {
        UUID uuid = UUID.randomUUID();
        String originalFilename = "b" + galleryNumber + j + ".jpg";
        String storedFilename = uuid + ".jpg";
        Photo photo = new Photo(uuid, originalFilename, storedFilename, 1337L, advertiser);

        try {
          Path source = Paths.get("uploads-test-data").resolve(originalFilename);
          Path target = Paths.get("uploads").resolve(storedFilename);
          Files.copy(source, target);
          boat.addPhoto(photo);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      Collections.shuffle(boat.getPhotos());

      boat.addTag(tag1);
      boat.addTag(tag2);
      boat.addTag(tag3);

      boat.addFishingEquipment(fe1);
      boat.addFishingEquipment(fe2);
      boat.addFishingEquipment(fe3);

      photoRepository.saveAll(boat.getPhotos());
      boatAdRepository.save(boat);
      tagRepository.saveAll(boat.getTags());
      fishingEquipmentRepository.saveAll(boat.getFishingEquipment());
    }
  }

  private void addAdventures() {
    Random random = new Random();

    Advertiser advertiser = (Advertiser) userRepository.findByUsername(fishingInstructorEmail).get();

    Tag tag1 = new Tag("Boat");
    Tag tag2 = new Tag("Fishing nets");
    Tag tag3 = new Tag("Baits");

    for (int i = 0; i < 20; i++) {
      AdventureAd adventure = new AdventureAd();
      adventure.setAdvertiser(advertiser);
      adventure.setTitle("Example Adventure " + i);

      Address address = new Address();
      address.setAddress("Example Address " + i);
      address.setCity(i % 2 == 0 ? "Novi Sad" : "Zrenjanin");
      address.setCountryCode("RS");
      address.setLatitude("45.313108");
      address.setLongitude("20.446850");
      address.setState("Vojvodina");
      address.setPostalCode(i % 2 == 0 ? "21000" : "23000");
      adventure.setAddress(address);

      adventure.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit." +
          "Maecenas fringilla metus nec justo tempus venenatis. Etiam ut neque eget ipsum.");
      adventure.setInstructorBio("Instruktor pecanja poslednjih 25 godina. U slobodno vreme pecam.");
      adventure.setPricingDescription("200");
      adventure.setAvailableAfter(LocalDate.now());
      adventure.setAvailableUntil(LocalDate.now().plusMonths(3));
      adventure.setRules("No smoking!");
      adventure.setCheckOutTime(LocalTime.parse("10:00"));
      adventure.setCheckInTime(LocalTime.parse("14:00"));
      adventure.setCurrency("MAD");
      adventure.setCapacity(i * 2);
      adventure.setPricePerPerson(BigDecimal.valueOf(40 + i * 3));
      adventure.setCancellationFee(BigDecimal.valueOf(12));

      int galleryNumber = random.nextInt((4 + 1) - 1) + 1;
      for (int j = 1; j <= 3; j++) {
        UUID uuid = UUID.randomUUID();
        String originalFilename = "f" + galleryNumber + j + ".jpg";
        String storedFilename = uuid + ".jpg";
        Photo photo = new Photo(uuid, originalFilename, storedFilename, 1337L, advertiser);

        try {
          Path source = Paths.get("uploads-test-data").resolve(originalFilename);
          Path target = Paths.get("uploads").resolve(storedFilename);
          Files.copy(source, target);
          adventure.addPhoto(photo);
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
      Collections.shuffle(adventure.getPhotos());

      adventure.addTag(tag1);
      adventure.addTag(tag2);
      adventure.addTag(tag3);

      photoRepository.saveAll(adventure.getPhotos());
      adventureAdRepository.save(adventure);
      tagRepository.saveAll(adventure.getTags());
    }
  }

  private void addReservations(Advertisement ad, List<Customer> customers) {
    List<String> reportComments = new ArrayList<>();
    reportComments.add("bad experience");
    reportComments.add("awful experience");
    reportComments.add("this customer made me consider early retirement");
    reportComments.add("he kept trying to steal the boat");
    reportComments.add("he just could not stop beatboxing and he was just ignoring everyone");
    reportComments.add("asked me if i could hide him from the police, i called the cops and he ran away");

    List<Reservation> reservations = new ArrayList<>();
    List<ReservationReport> reports = new ArrayList<>();

    // past
    for (int i = 0; i < 1; i++) {
      Reservation reservation = new Reservation();
      reservation.setCreatedAt(LocalDateTime.now());
      reservation.setStartDateTime(LocalDateTime.now().minusDays(15).plusHours(random.nextInt(24)));
      reservation.setEndDateTime(LocalDateTime.now().minusDays(10).plusHours(random.nextInt(24)));
      reservation.setAdvertisement(ad);
      reservation.setCustomer(customers.get(random.nextInt(customers.size())));
      reservation.setCalculatedPrice(BigDecimal.valueOf(333));
      reservation.setAttendees(1);
      reservation.setCancelled(false);
      reservations.add(reservation);

//      if (i < 2) {
//        ReservationReport report = new ReservationReport();
//        report.setCreatedAt(LocalDateTime.now());
//        report.setReservation(reservation);
//        report.setComment(reportComments.get(random.nextInt(reportComments.size())));
//        report.setPenaltyRequested(random.nextBoolean());
//        report.setCustomerWasLate(random.nextBoolean());
//        report.setApprovalStatus(report.getPenaltyRequested() ? ApprovalStatus.PENDING : ApprovalStatus.APPROVED);
//        reports.add(report);
//      }
    }

    // active
//    for (int i = 0; i < 1; i++) {
//      Reservation reservation = new Reservation();
//      reservation.setCreatedAt(LocalDateTime.now());
//      reservation.setStartDateTime(LocalDateTime.now().minusDays(5).plusHours(random.nextInt(24)));
//      reservation.setEndDateTime(LocalDateTime.now().plusDays(5).plusHours(random.nextInt(24)));
//      reservation.setAdvertisement(ad);
//      reservation.setCustomer(customers.get(random.nextInt(customers.size())));
//      reservation.setCalculatedPrice(BigDecimal.valueOf(1337));
//      reservation.setAttendees(1);
//      reservation.setCancelled(false);
//
//      reservations.add(reservation);
//    }

    // future
   /* for (int i = 0; i < 1; i++) { // changed from 5 to 1
      Reservation reservation = new Reservation();
      reservation.setCreatedAt(LocalDateTime.now());
      reservation.setStartDateTime(LocalDateTime.now().plusDays(10).plusHours(random.nextInt(24)));
      reservation.setEndDateTime(LocalDateTime.now().plusDays(15).plusHours(random.nextInt(24)));
      reservation.setAdvertisement(ad);
      reservation.setCustomer(customers.get(random.nextInt(customers.size())));
      reservation.setCalculatedPrice(BigDecimal.valueOf(1337));
      reservation.setAttendees(1);
      reservation.setCancelled(false);

      reservations.add(reservation);
    }*/

    reservationRepository.saveAll(reservations);
    reservationReportRepository.saveAll(reports);
  }

  private void addReviews() {
    List<Reservation> reservations = reservationRepository.findAll();
    //List<Review> reviews = new ArrayList<>();

//    reservations.forEach(reservation -> {
//      if (!reservation.getCancelled()) {
//        Review review = new Review();
//        review.setCreatedAt(LocalDateTime.now());
//        review.setAdvertisement(reservation.getAdvertisement());
//        review.setCustomer(reservation.getCustomer());
//        review.setApprovalStatus(ApprovalStatus.APPROVED);
//        review.setComment("this is a review for advertisement " + reservation.getAdvertisement().getTitle());
//        review.setRating(5);
//        reviewRepository.save(review);
//      }
//    });
    for (int i = 0; i < 4; i++) {
      Reservation reservation = reservations.get(random.nextInt(reservations.size()));

      if (reservation.getCancelled())
        continue;
      Review review = new Review();
      review.setCreatedAt(LocalDateTime.now());
      review.setAdvertisement(reservation.getAdvertisement());
      review.setCustomer(reservation.getCustomer());
      review.setApprovalStatus(ApprovalStatus.APPROVED);
      review.setComment(String.format("this is a review for %s by %s %s", reservation.getAdvertisement().getTitle(), reservation.getCustomer().getFirstName(), reservation.getCustomer().getLastName()));
      review.setRating(5);

      //reviews.add(review);
      reviewRepository.save(review);
    }
  }

  private void addComplaints() {
    List<String> complaintComments = new ArrayList<>();
    complaintComments.add("bad experience");
    complaintComments.add("awful experience");
    complaintComments.add("he said he knows where we are going and we ended up in ečka");
    complaintComments.add("i want my money back this is a pyramid scheme");
    complaintComments
        .add("she could not stop committing tax fraud, i told her to stop but she didnt pay attention at all");
    complaintComments.add("i am sure this advertiser has a criminal past that you were not aware of");
    complaintComments.add("hi i am a hacker<script>alert(\"you just got hacked\")</script>");

    List<Reservation> reservations = reservationRepository.findAll();
    List<Complaint> complaints = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      Reservation reservation = reservations.get(random.nextInt(reservations.size()));

      Complaint complaint = new Complaint();
      complaint.setCreatedAt(LocalDateTime.now());
      complaint.setAdvertisement(reservation.getAdvertisement());
      complaint.setCustomer(reservation.getCustomer());
      complaint.setComment(complaintComments.get(random.nextInt(complaintComments.size())));
      complaint.setResponseStatus(ResponseStatus.PENDING);

      complaints.add(complaint);
    }

    complaintRepository.saveAll(complaints);
  }

  // private void addReviews() {
  // List<Reservation> reservations = reservationRepository.findAll();
  // List<Review> reviews = new ArrayList<>();
  //
  // for (int i = 0; i < 100; i++) {
  // Reservation reservation =
  // reservations.get(random.nextInt(reservations.size()));
  // Review review = new Review();
  // review.setCreatedAt(LocalDateTime.now());
  // review.setAdvertisement(reservation.getAdvertisement());
  // review.setCustomer(reservation.getCustomer());
  // review.setRating(random.nextInt(1, 6));
  // review.setComment("example review" + i);
  // review.setApprovalStatus(i < 80 ? ApprovalStatus.APPROVED :
  // ApprovalStatus.PENDING);
  //
  // reviews.add(review);
  // }
  //
  // reviewRepository.saveAll(reviews);
  // }
}
