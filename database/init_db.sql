-- Guitar Shop DB v 1.0

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema guitar_shop_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `guitar_shop_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `guitar_shop_db`;

-- -----------------------------------------------------
-- Table `guitar_shop_db`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`address`
(
    `id`       BIGINT       NOT NULL AUTO_INCREMENT,
    `city`     VARCHAR(255) NULL DEFAULT NULL,
    `country`  VARCHAR(255) NULL DEFAULT NULL,
    `state`    VARCHAR(255) NULL DEFAULT NULL,
    `street`   VARCHAR(255) NULL DEFAULT NULL,
    `zip_code` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 7
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`country`
(
    `id`   SMALLINT UNSIGNED NOT NULL,
    `code` VARCHAR(2)        NULL DEFAULT NULL,
    `name` VARCHAR(255)      NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb3;

/*!40000 ALTER TABLE `country`
    DISABLE KEYS */;
INSERT INTO `country` (`id`, `code`, `name`)

VALUES (1, 'BR', 'Brazil'),
       (2, 'CA', 'Canada'),
       (3, 'FR', 'France'),
       (4, 'DE', 'Germany'),
       (5, 'IN', 'India'),
       (6, 'TR', 'Turkey'),
       (7, 'US', 'United States');
/*!40000 ALTER TABLE `country`
    ENABLE KEYS */;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`customer`
(
    `id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NULL DEFAULT NULL,
    `last_name`  VARCHAR(255) NULL DEFAULT NULL,
    `email`      VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 3
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`orders`
(
    `id`                    BIGINT         NOT NULL AUTO_INCREMENT,
    `order_tracking_number` VARCHAR(255)   NULL DEFAULT NULL,
    `total_price`           DECIMAL(19, 2) NULL DEFAULT NULL,
    `total_quantity`        INT            NULL DEFAULT NULL,
    `billing_address_id`    BIGINT         NULL DEFAULT NULL,
    `customer_id`           BIGINT         NULL DEFAULT NULL,
    `shipping_address_id`   BIGINT         NULL DEFAULT NULL,
    `status`                VARCHAR(128)   NULL DEFAULT NULL,
    `date_created`          DATETIME(6)    NULL DEFAULT NULL,
    `last_updated`          DATETIME(6)    NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `UK_billing_address_id` (`billing_address_id` ASC) VISIBLE,
    UNIQUE INDEX `UK_shipping_address_id` (`shipping_address_id` ASC) VISIBLE,
    INDEX `K_customer_id` (`customer_id` ASC) VISIBLE,
    CONSTRAINT `FK_billing_address_id`
        FOREIGN KEY (`billing_address_id`)
            REFERENCES `guitar_shop_db`.`address` (`id`),
    CONSTRAINT `FK_customer_id`
        FOREIGN KEY (`customer_id`)
            REFERENCES `guitar_shop_db`.`customer` (`id`),
    CONSTRAINT `FK_shipping_address_id`
        FOREIGN KEY (`shipping_address_id`)
            REFERENCES `guitar_shop_db`.`address` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 4
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`product_category`
(
    `id`            BIGINT       NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 5
    DEFAULT CHARACTER SET = utf8mb3;

-- Listage des données de la table full-stack-ecommerce.product_category : ~4 rows (environ)
/*!40000 ALTER TABLE `product_category`
    DISABLE KEYS */;
INSERT INTO `product_category` (`id`, `category_name`)
VALUES (1, 'Guitars'),
       (2, 'Acoustic Guitars'),
       (3, 'Bass Guitars'),
       (4, 'Accessories');
/*!40000 ALTER TABLE `product_category`
    ENABLE KEYS */;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`product`
(
    `id`             BIGINT         NOT NULL AUTO_INCREMENT,
    `sku`            VARCHAR(255)   NULL DEFAULT NULL,
    `brand`          VARCHAR(255)   NULL DEFAULT NULL,
    `name`           VARCHAR(255)   NULL DEFAULT NULL,
    `description`    VARCHAR(1000)   NULL DEFAULT NULL,
    `unit_price`     DECIMAL(13, 2) NULL DEFAULT NULL,
    `image_url`      VARCHAR(255)   NULL DEFAULT NULL,
    `active`         BIT(1)         NULL DEFAULT b'1',
    `units_in_stock` INT            NULL DEFAULT NULL,
    `date_created`   DATETIME(6)    NULL DEFAULT NULL,
    `last_updated`   DATETIME(6)    NULL DEFAULT NULL,
    `category_id`    BIGINT         NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_category` (`category_id` ASC) VISIBLE,
    CONSTRAINT `fk_category`
        FOREIGN KEY (`category_id`)
            REFERENCES `guitar_shop_db`.`product_category` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 101
    DEFAULT CHARACTER SET = utf8mb3;

-- Listage des données de la table full-stack-ecommerce.product : ~30 rows (environ)
/*!40000 ALTER TABLE `product`
    DISABLE KEYS */;

INSERT INTO `product` (`id`, `sku`, `brand`, `name`, `description`, `unit_price`, `image_url`, `active`, `units_in_stock`, `date_created`, `last_updated`, `category_id`)
VALUES (1, 'GUITAR-FENDER-1000','Fender', 'Fender American Professional II Stratocaster Maple Dark Night',
        'From its original form, Fender''s American Professional II Stratocaster provides a number of improvements. The lightweight, curved body creates a tonal foundation that is well-balanced and very resonant. The pickup selection on this solidbody electric guitar is the first big change. The V-Mod II single-coil pickups on the American Professional II Stratocaster produce a classic tone with modern enhancements. A cold-rolled steel block and an improved 2-point tremolo bridge work together to provide lots of sustain and brightness. A contoured heel joint, a "Super-Natural" silky neck finish, and updated electronics are among the other performance enhancements. The American Professional II Stratocaster is worth considering if you''re seeking for a guitar with a classic voice and a contemporary feel.',
        1699.99, 'assets/images/products/guitars/guitar-fender-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (2, 'GUITAR-FENDER-1001','Fender', 'Fender American Professional II Stratocaster RW Mercury',
        'The American Professional II Stratocaster from Fender provides a number of improvements over the original model. The lightweight, curved body creates a tonal foundation that is well-balanced and sonorous. The pickup selection is the first big enhancement on this solidbody electric guitar. The V-Mod II single-coil pickups on the American Professional II Stratocaster produce a classic tone with modern enhancements. A cold-rolled steel block and an improved 2-point tremolo bridge provide plenty of sustain and brightness. A contoured heel joint, "Super-Natural" silky neck finish, and updated electronics are among the other performance enhancements. The American Professional II Stratocaster is a good choice if you want a guitar with a classic sound and a contemporary feel.',
        1699.99, 'assets/images/products/guitars/guitar-fender-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (3, 'GUITAR-FENDER-1002','Fender', 'Fender Squier Classic Vibe 50''s Stratocaster MN White Blonde',
        'The Squier Classic Vibe Stratocaster ''50s pays homage to the first decade of the Fender Stratocaster. This vintage-style solidbody electric guitar has the tone and styling that has made the Strat such a popular instrument. Many amazing improvements have been made to this revised model, making it a greater bargain than ever. It comes with a trio of Fender-designed alnico single-coil pickups (with standard 5-way switching) that faithfully reproduce the classic Stratocaster sound. The 1.65" bone nut on the Traditional Vibe Stratocaster ''50s is an excellent complement to the classic C-shaped neck and 9.5"-radius fretboard, providing the type of sustain and performance that you don''t usually get on a budget-friendly instrument.',
        419.99, 'assets/images/products/guitars/guitar-fender-1002.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (4, 'GUITAR-FENDER-1003','Fender', 'Fender Squier Affinity Telecaster MN Butterscotch Blonde',
        'At an unbelievable low price, the Squier Affinity Series Telecaster puts authentic Tele feel, tone, and appearance in your hands. The Squier Affinity Series Telecaster has a lightweight, resonant poplar body with a strong C-shape maple neck for countless hours of comfort and playability on stage, in the studio, or in the garage as you develop your own style across genres. Two single-coil pickups produce the classic Tele tone, which is bright, rich, and aggressive. Furthermore, master volume and master tone knobs let you to fine-tune your sound with little adjustments.',
        289.99, 'assets/images/products/guitars/guitar-fender-1003.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (5, 'GUITAR-PRS-1000','PRS','PRS SE Hollowbody II Faded Blue Burst',
        'The PRS SE Hollowbody II is a workhorse electric guitar that''s built to perform as great as it looks. Featuring fully hollow construction, this eye-popping instrument features a figured maple top and back with mahogany sides — a tonewood cocktail that delivers extraordinary clarity and warm resonance. The SE Hollowbody II also features a very comfortable Wide Fat mahogany set neck and a premium ebony fingerboard emblazoned with iconic PRS Birds inlays. Dual F-holes and two toneful 58/15 S humbucking pickups round out the feature set. For amazing tone, playability, and value, the PRS SE Hollowbody II is hard to beat.',
        1199.00, 'assets/images/products/guitars/guitar-prs-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (6, 'GUITAR-PRS-1001','PRS', 'PRS SE Standard 24-08 Trans Blue',
        'The PRS SE Standard 24-08 has it all: playability, tone, aesthetics, and cost. Because of its concentrated tone, uncomplicated appearance, and top-tier craftsmanship, the SE Standard 24 has been a favorite for years. Today''s SE Standard 24-08 incorporates all of this into a visually appealing, value-packed instrument with increased flexibility that sings with articulation and warmth reminiscent of iconic classic rock tones. A pair of TCI-tuned "S" humbuckers provide crystal clarity as well as plenty of power to turn up the heat when needed. The SE Standard 24-08 boasts a pair of small toggles for stunningly authentic acoustic tones at the flick of a switch, just like PRS'' other 24-08 models. Wide-thin neck profile, PRS proprietary tremolo, and distinctive Birds inlays are all included.',
        729.00, 'assets/images/products/guitars/guitar-prs-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (7, 'GUITAR-PRS-1003','PRS', 'PRS SE Custom 24 Faded Blue Burst',
        'The SE Custom 24 solidbody electric guitar by Paul Reed Smith combines the tone, playability, and beautiful appearance of the Custom series into a more inexpensive instrument. The mahogany body and maple top of the SE Custom 24 now have a more typical "violin" body carve, giving it the feel of top-level Custom 24 guitars. A pair of 85/15 "S" pickups produce a wide range of excellent humbucking and single-coil tones. The rosewood fretboard is embellished with Birds inlays for that classic PRS aesthetic, and the maple neck has a Wide Thin design for comfortable rapid playability. You don''t have to be a traveling rock star to appreciate the tone and playability of the PRS SE Custom 24.',
        849.00, 'assets/images/products/guitars/guitar-prs-1003.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (8, 'GUITAR-JACKSON-1000','Jackson', 'Jackson Pro RRT22 Christian Andreu - Natural',
        'Christian Andreu of Gojira is known for his fondness for Jackson Rhoads solid-body electric guitars, and the Jackson Pro Series Signature Christian Andreu Rhoads RRT is made just for him. This axe is perfect for Gojira''s brutal death metal brand, thanks to its covered high-output humbucking pickups, while its graphite-reinforced maple neck design and string-through-body tailpiece provide excellent sustain. In addition to this, the compound radius fretboard ensures the flexible playability that technical guitarists demand. The Signature Christian Andreu Rhoads RRT features Jackson''s classic offset V-shaped body with a dizzyingly flamed maple top and matching headstock. A blacked-out (i.e. no inlay) fretboard and black hardware complete the metallic aesthetic of the Pro Series Signature Christian Andreu Rhoads RRT.',
        1049.99, 'assets/images/products/guitars/guitar-jackson-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (9, 'GUITAR-JACKSON-1001','Jackson', 'Jackson Pro SL3R - Mirror',
        'The Jackson Pro Series Soloist SL3R combines the blazing tones of the Pro Soloist series with the rich, glassy punch of a pair of original Duncan single-coils in the neck and center positions. This HSS is ready for everything you throw at it, from contemporary metal to conventional rock and blues, thanks to the Duncan Distortion humbucker in the bridge position. The Soloist SL3R''s basswood body is comfortable to hold, and the oiled maple neck and all-duty compound-radius ebony fingerboard are ideal for chords and leads. The Soloist SL3R dive-bombs thanks to a Floyd Rose double-locking tremolo on the bridge. With an eye-catching mirror finish, matching headstock, and mirror piranha teeth fingerboard inlays, the Pro Series Soloist SL3R is as show-ready as they come.',
        1599.99, 'assets/images/products/guitars/guitar-jackson-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (10, 'GUITAR-JACKSON-1002','Jackson', 'Jackson JS1X DK Minion AH FB Black',
        'The Jackson® JS Series DinkyTM Minion JS1X is excellent for any shredder looking for a portable instrument with all of their favorite features. The Dinky Minion JS1X has a poplar body, a fast bolt-on maple neck with graphite reinforcing rods, and a 12"-radius amaranth fingerboard with 24 jumbo frets and sharkfin inlays with a 2/3 scale length (22.5"). A rear-angled Jackson pointed 6-in-line headstock distributes tension evenly, while a contoured heel makes upper-fret playing simple. A pair of Jackson ceramic magnet high-output humbucking pickups produce a clean tone with lots of girth. Bright highs come from the neck position, while gritty distortion comes from the bridge.',
        179.99, 'assets/images/products/guitars/guitar-jackson-1002.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (11, 'GUITAR-JACKSON-1003','Jackson', 'Jackson SLXDX - Multi Camo',
        'The Jackson X Series Soloist SLX DX is a serious performer, with eye-catching visuals. This 21st-century hot-rodded machine encourages fleet-fingered playing with its compound-radius fingerboard, while its graphite-reinforced through-body neck gives exceptional sustain and stability. Thanks to two high-output ceramic humbuckers, you''ll get a big, girthy tone with plenty of punch and bite when you plug it into your favorite high-gain amp or modeler. Do you want to do some outrageous whammy bar tricks? If that''s the case, the Floyd Rose double-locking tremolo on this solidbody electric guitar will more than enough. The X Series Soloist SLX DX is finished off with classic pearloid shark fin fingerboard inlays, aggressive-looking black hardware, and a matching pointed headstock.',
        949.99, 'assets/images/products/guitars/guitar-jackson-1003.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 1),
       (12, 'ACOUSTIC-PRS-1000','PRS', 'PRS SE A60 Angelus Natural',
        'The SE A60 Angelus embodies legendary PRS excellence in a budget-friendly acoustic-electric that''s built for live performance. The A60 creates a superb acoustic tone that is steeped in crisp top end with just the proper amount of low-end coloration for a well-rounded, rich tone, thanks to its solid Sitka spruce top and ziricote back and sides with a seamless cutaway. The inbuilt Fishman Sonitone electronics generate superb amplified acoustic tone when you''re ready to connect in.',
        919.00, 'assets/images/products/guitars/acoustic-prs-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (13, 'ACOUSTIC-PRS-1001','PRS', 'PRS SE P20E Parlor Acoustic-Electric Tobacco Sunburst',
        'Paul Reed Smith''s PRS SE P20E electric guitar is a new, compact, parlor-sized model. It features a Tobacco Sunburst color! The small size of the PRS SE P20E does not mean a dull tone. PRS'' hybrid "X"/Classical bracing keeps the sides and back of the guitar in check while allowing for the top to vibrate freely. The PRS SE P20 projects a bold, even tone. All-mahogany construction adds warmth and organicity to the guitar.',
        629.00, 'assets/images/products/guitars/acoustic-prs-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (14, 'ACOUSTIC-EPIPHONE-1000','Epiphone', 'Epiphone J-45 Aged Vintage Sunburst Gloss',
        'Since its introduction in 1942, the renowned J-45 has been the instrument of choice for great artists. It is Gibson''s most famous and popular acoustic guitar model, known as The Workhorse. Epiphone has just produced a new Inspired by GibsonTM J-45 with all of the qualities players demand, including all solid wood construction, a comfortable rounded C neck profile, 20 medium jumbo frets, the Kalamazoo headstock design from the 1960s, and a stunning Aged Vintage Sunburst finish. This Workhorse is also stage-ready thanks to the Fishman® Sonicore under-saddle pickup and Sonitone preamp. Separately available hardshell or EpiLite cases.',
        749.00, 'assets/images/products/guitars/acoustic-epiphone-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (15, 'ACOUSTIC-EPIPHONE-1001','Epiphone', 'Epiphone J-45 EC Studio Natural',
        'The J-45 Studio features a bell-like form, a bigger lower bout, and a tiny round upper bout, giving it a distinct voice in our Advanced Jumbo family of guitars. The J-45 Studio was created using Epiphone''s century of experience in creating world-class guitars that are designed to be played.',
        369.00, 'assets/images/products/guitars/acoustic-epiphone-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (16, 'BASS-JACKSON-1000','Jackson', 'Jackson X Series Spectra SBXQ V - Trans Black Burst',
        'With a poplar body, patchwork maple top, maple neck, and active humbucking pickups, the Jackson X Series Spectra Bass SBXQ V packs plenty of punch — and elegant aesthetics to boot. The SBXQ V is equipped with a HiMass bridge, two Jackson pickups, and coil-split circuitry, making it simple to tune in the ideal tone for every concert or recording session. The Jackson Speed neck shape of the bass is capped with a smooth compound-radius laurel fingerboard and jumbo frets for easy playing. The beautiful maple top and the trendy glossy finish are guaranteed to catch everyone''s attention. Look no farther than the Jackson X Series Spectra Bass SBXQ V if you''re seeking for a genuinely gig-worthy bass at a terrific price.',
        899.99, 'assets/images/products/guitars/bass-jackson-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 3),
       (17, 'BASS-JACKSON-1001','Jackson', 'Jackson Series Spectra SBXQ IV - Amber Blue Burst',
        'With a poplar body, patchwork maple top, maple neck, and active humbucking pickups, the Jackson X Series Spectra Bass SBXQ IV packs plenty of punch — and elegant aesthetics to boot. The SBXQ IV is equipped with a HiMass bridge, two Jackson pickups, and coil-split circuitry, making it simple to tune in the ideal tone for every concert or recording session. The Jackson Speed neck shape of the bass is capped with a smooth compound-radius laurel fingerboard and jumbo frets for easy playing. The patchwork maple top, as well as the sleek glossy finish, are guaranteed to attract attention. Look no farther than the Jackson X Series Spectra Bass SBXQ IV if you''re searching for a genuinely gig-worthy bass at a terrific price.',
        799.99, 'assets/images/products/guitars/bass-jackson-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 3),
       (18, 'BASS-PRS-1000','PRS', 'PRS SE KingFisher Faded Blue Wraparound Burst',
        'A bass in the manner of today, the PRS SE Kingfisher offers a diverse range of tones. The bridge humbucker''s punch and articulation perfectly offset the lush, vintage sound of the neck humbucker. However, the Kingfisher truly excels when combining the pickups. The end product is a powerful and imposing sound that complements fusion and slap-and-pop funk lines effectively. Hipshot TransTone bridge, a lightweight swamp ash body, and a sturdy 5-piece maple/walnut thru neck work together to provide a well-balanced tone with exceptional sustain.',
        1029, 'assets/images/products/guitars/bass-prs-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 3),
       (19, 'BASS-FENDER-1000','Fender', 'Fender Player Jazz Bass - Buttercream with Maple Fingerboard',
        'The Fender Jazz Bass was first introduced in 1960. It has been a popular instrument at Guitars-USA and throughout modern music history. This heritage is celebrated with improvements that working musicians will love the Fender Player Series Jazz Bass. This J Bass''s offset alder body is extremely comfortable and allows you to create tight grooves and runs with ease. Two Player Series Alnico 5 single-coil pickups give it the J Bass sound and punch. Fender Player Series Jazz Bass is the perfect instrument to get your groove on.',
        849.99, 'assets/images/products/guitars/bass-fender-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 3),
       (20, 'ACCESSORY-PRS-1000','PRS', 'PRS Classic Instrument Cable - 6" Angle-Angle',
        'Your cables are just as important as any other part of your rig, so why would you buy anything other than what exceeds your expectations? PRS Classic Series instrument cables are built to do just that — exceed your expectations. This cable features spiral shielding that improves flexibility and durability without sacrificing any of your tone. PRS even specially tuned the capacitance of the cable just high enough to warm up the tone but not low enough that the cable becomes extra bright. This fine-tuning gives the PRS Classic Series cables awesome signal clarity and tone all their own.',
        22.99, 'assets/images/products/accessories/accessory-prs-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (21, 'ACCESSORY-PRS-1001','PRS', 'PRS Classic Instrument Cable - 18'' Straight-Angle',
        'Your cables are just as important as any other part of your rig, so why would you buy anything other than what exceeds your expectations? PRS Classic Series instrument cables are built to do just that — exceed your expectations. This cable features spiral shielding that improves flexibility and durability without sacrificing any of your tone. PRS even specially tuned the capacitance of the cable just high enough to warm up the tone but not low enough that the cable becomes extra bright. This fine-tuning gives the PRS Classic Series cables awesome signal clarity and tone all their own.',
        28.49, 'assets/images/products/accessories/accessory-prs-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (22, 'ACCESSORY-PRS-1002','PRS', 'PRS Classic Instrument Cable - 18'' Straight-Straight',
        'Your cables are just as important as any other part of your rig, so why would you buy anything other than what exceeds your expectations? PRS Classic Series instrument cables are built to do just that — exceed your expectations. This cable features spiral shielding that improves flexibility and durability without sacrificing any of your tone. PRS even specially tuned the capacitance of the cable just high enough to warm up the tone but not low enough that the cable becomes extra bright. This fine-tuning gives the PRS Classic Series cables awesome signal clarity and tone all their own.',
        26.50, 'assets/images/products/accessories/accessory-prs-1002.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (23, 'ACCESSORY-PIGHOG-1000','Pig Hog', 'Pig Hog Mic Cable XLR 6ft. PHM6',
        'Pig Hog cables are precisely overbuilt to stand up to the most grueling tour conditions imaginable. They feature extra-thick 8mm wire, performance quality connectors, and tension-resistant stress relief. And with Pig Hog''s "no question" lifetime guarantee, we''ve got your back for the life of the cable. Don''t settle for those fat-free cables. Grab hold of a Pig Hog!',
        17.99, 'assets/images/products/accessories/accessory-pighog-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (24, 'ACCESSORY-PIGHOG-1001','Pig Hog', 'PIG HOG 25'' XLR MIC CABLE PHM25',
        'Pig Hog cables are precisely overbuilt to stand up to the most grueling tour conditions imaginable. They feature extra-thick 8mm wire, performance quality connectors, and tension-resistant stress relief. And with Pig Hog''s "no question" lifetime guarantee, we''ve got your back for the life of the cable. Don''t settle for those fat-free cables. Grab hold of a Pig Hog!',
        36.00, 'assets/images/products/accessories/accessory-pighog-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (25, 'ACCESSORY-TAYLOR-1000','Taylor', 'Taylor 2" Cotton Guitar Strap',
        'The Taylor GS Mini Guitar Strap is sharp and practical, a perfect complement for any GS Mini. This strap is made from premium natural cotton with genuine suede end tabs. It also features an embossed gold Taylor logo.',
        24.99, 'assets/images/products/accessories/accessory-taylor-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (26, 'ACCESSORY-TAYLOR-1001','Taylor', 'Taylor 2" Academy Jacquard Leather Guitar Strap',
        'The Taylor Academy Jacquard Leather Guitar Strap delivers comfort and support with an earthy, organic look woven from premium cotton. This unique strap features a jacquard pattern with genuine suede end tabs and an embossed gold Taylor logo. At 2" wide, it provides comfortable support on the shoulder with enough freedom to let you move while you play.',
        39.99, 'assets/images/products/accessories/accessory-taylor-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (27, 'ACCESSORY-PRS-1003','PRS', 'PRS Signature Buffalo Reversible Strap Tan 3.5"',
        'PRS Signature Buffalo reversible guitar straps are made from a single piece of high-quality buffalo hide. Reversible with finished leather on one side and suede on the other, these guitar straps are extra wide for comfortable weight displacement.',
        79.99, 'assets/images/products/accessories/accessory-prs-1003.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 4),
       (28, 'ACOUSTIC-GIBSON-1000','Gibson', 'Gibson J-45 Studio Walnut Antique Natural',
        'This one-of-a-kind J-45 Studio will turn heads. Handcrafted with a Sitka spruce top and walnut back and sides. The thin body depth improves underarm comfort, while the flatter fingerboard allows for better playing. Available in both Antique Natural and Walnut Burst finishes, as well as lefty! Finished with an active under-saddle piezo pickup for convenient studio quality plug and play anywhere!',
        2199.00, 'assets/images/products/guitars/acoustic-gibson-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (29, 'ACOUSTIC-GIBSON-1001','Gibson', 'Gibson J-45 Standard Cherry',
        'The J-45 is Gibson''s best-selling acoustic of all time. Nicknamed "The Workhorse" and first introduced in 1942, this iconic acoustic has become the cornerstone of its round-shoulder, dreadnought line. World-renowned for its full, balanced expression, warm bass, and excellent projection, the J-45 has been refined to carry this legacy to new heights. The Gibson J-45 Standard''s classic combination of a Sitka spruce top coupled with mahogany back and sides deliver a sound with incredible dynamic range, warm mids, and a tight punchy bass. Now available in Cherry; a Gibson hardshell case is included.',
        2849.00, 'assets/images/products/guitars/acoustic-gibson-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (30, 'ACOUSTIC-GIBSON-1002','Gibson', 'Gibson Acoustic G-45 Acoustic Guitar - Natural',
        'The tone is crisp and clear thanks to the solid Sitka Spruce top and solid walnut back and sides. The slightly smaller round shoulder body makes it extremely comfortable to use and hold. The TUSQ(r), saddle and Grover(r] Mini Rotomatic(r), tuners provide solid tuning stability, so you can spend more of your time playing than tuning. The useful neck with its simple-playing Advanced Response neck profile makes it so easy you''ll never want to take it off. You also get a gig bag.',
        1199.00, 'assets/images/products/guitars/acoustic-gibson-1002.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (31, 'ACOUSTIC-TAYLOR-1000','Taylor Guitar', 'Taylor AD17e Blacktop American Dream Grand Pacific',
        'The AD17e Blacktop from the American Dream Series is one of the most affordable all-solid-wood guitars made in our California plant, providing guitarists with a more accessible entry point to the tonal richness and refinement that comes with solid-wood construction. The dreadnought-style body and V-Class bracing inside give a warm, shimmering midrange with a dash of treble clarity, while the ovankgol back and sides pair with a spruce top to produce a warm, shimmering midrange with a splash of treble clarity. The soundboard on this model has a dramatic blacktop color treatment, and it comes with our ES2 acoustic pickup and a lightweight, yet durable AeroCase.',
        1799.00, 'assets/images/products/guitars/acoustic-taylor-1000.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2),
       (32, 'ACOUSTIC-TAYLOR-1001','Taylor Guitar', 'Taylor AD22e Grand Concert Aerocase',
        'The AD22e is the first Grand Concert entry in Taylor''s American Dream Series of acoustic guitars, and it''s crafted at the intersection of solid-wood tone and exceptional value. Solid sapele back and sides, as well as a mahogany top, produce a warm, woody tone with a strong midrange concentration. The V-Class bracing articulates the top to generate greater volume and longer sustain, while the hardwood top helps offer balance with a diverse attack. The somewhat shorter scale length of 24-7/8" and thinner waist provide a pleasingly welcome feel and great tonal distinction that will excite both fingerstyle and flatpicking players. The AD22e is finished off with clean appointments and comes with the ES2 pickup and a lightweight, yet super-durable AeroCase.',
        1699.00, 'assets/images/products/guitars/acoustic-taylor-1001.png', b'1', 50, '2022-10-10 18:21:34.000000', NULL, 2);

/*!40000 ALTER TABLE `product`
    ENABLE KEYS */;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`order_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`order_item`
(
    `id`         BIGINT         NOT NULL AUTO_INCREMENT,
    `image_url`  VARCHAR(255)   NULL DEFAULT NULL,
    `quantity`   INT            NULL DEFAULT NULL,
    `unit_price` DECIMAL(19, 2) NULL DEFAULT NULL,
    `order_id`   BIGINT         NULL DEFAULT NULL,
    `product_id` BIGINT         NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `K_order_id` (`order_id` ASC) VISIBLE,
    INDEX `FK_product_id` (`product_id` ASC) VISIBLE,
    CONSTRAINT `FK_order_id`
        FOREIGN KEY (`order_id`)
            REFERENCES `guitar_shop_db`.`orders` (`id`),
    CONSTRAINT `FK_product_id`
        FOREIGN KEY (`product_id`)
            REFERENCES `guitar_shop_db`.`product` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 12
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_general_ci;


-- -----------------------------------------------------
-- Table `guitar_shop_db`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guitar_shop_db`.`state`
(
`id`         SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name`       VARCHAR(255)      NULL DEFAULT NULL,
    `country_id` SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_country` (`country_id` ASC) VISIBLE,
    CONSTRAINT `fk_country`
        FOREIGN KEY (`country_id`)
            REFERENCES `guitar_shop_db`.`country` (`id`)
)
    ENGINE = InnoDB
    AUTO_INCREMENT = 224
    DEFAULT CHARACTER SET = utf8mb3;

-- Listage des données de la table full-stack-ecommerce.state : ~223 rows (environ)
/*!40000 ALTER TABLE `state`
    DISABLE KEYS */;
INSERT INTO `state` (`id`, `name`, `country_id`)
VALUES (1, 'Acre', 1),
       (2, 'Alagoas', 1),
       (3, 'Amapá', 1),
       (4, 'Amazonas', 1),
       (5, 'Bahia', 1),
       (6, 'Ceará', 1),
       (7, 'Distrito Federal', 1),
       (8, 'Espírito Santo', 1),
       (9, 'Goiás', 1),
       (10, 'Maranhão', 1),
       (11, 'Mato Grosso do Sul', 1),
       (12, 'Mato Grosso', 1),
       (13, 'Minas Gerais', 1),
       (14, 'Paraná', 1),
       (15, 'Paraíba', 1),
       (16, 'Pará', 1),
       (17, 'Pernambuco', 1),
       (18, 'Piaui', 1),
       (19, 'Rio de Janeiro', 1),
       (20, 'Rio Grande do Norte', 1),
       (21, 'Rio Grande do Sul', 1),
       (22, 'Rondônia', 1),
       (23, 'Roraima', 1),
       (24, 'Santa Catarina', 1),
       (25, 'Sergipe', 1),
       (26, 'São Paulo', 1),
       (27, 'Tocantins', 1),
       (28, 'Alberta', 2),
       (29, 'British Columbia', 2),
       (30, 'Manitoba', 2),
       (31, 'New Brunswick', 2),
       (32, 'Newfoundland and Labrador', 2),
       (33, 'Northwest Territories', 2),
       (34, 'Nova Scotia', 2),
       (35, 'Nunavut', 2),
       (36, 'Ontario', 2),
       (37, 'Prince Edward Island', 2),
       (38, 'Quebec', 2),
       (39, 'Saskatchewan', 2),
       (40, 'Yukon', 2),
       (41, 'Baden-Württemberg', 4),
       (42, 'Bavaria', 4),
       (43, 'Berlin', 4),
       (44, 'Brandenburg', 4),
       (45, 'Bremen', 4),
       (46, 'Hamburg', 4),
       (47, 'Hesse', 4),
       (48, 'Lower Saxony', 4),
       (49, 'Mecklenburg-Vorpommern', 4),
       (50, 'North Rhine-Westphalia', 4),
       (51, 'Rhineland-Palatinate', 4),
       (52, 'Saarland', 4),
       (53, 'Saxony', 4),
       (54, 'Saxony-Anhalt', 4),
       (55, 'Schleswig-Holstein', 4),
       (56, 'Thuringia', 4),
       (57, 'Andhra Pradesh', 5),
       (58, 'Arunachal Pradesh', 5),
       (59, 'Assam', 5),
       (60, 'Bihar', 5),
       (61, 'Chhattisgarh', 5),
       (62, 'Goa', 5),
       (63, 'Gujarat', 5),
       (64, 'Haryana', 5),
       (65, 'Himachal Pradesh', 5),
       (66, 'Jammu & Kashmir', 5),
       (67, 'Jharkhand', 5),
       (68, 'Karnataka', 5),
       (69, 'Kerala', 5),
       (70, 'Madhya Pradesh', 5),
       (71, 'Maharashtra', 5),
       (72, 'Manipur', 5),
       (73, 'Meghalaya', 5),
       (74, 'Mizoram', 5),
       (75, 'Nagaland', 5),
       (76, 'Odisha', 5),
       (77, 'Punjab', 5),
       (78, 'Rajasthan', 5),
       (79, 'Sikkim', 5),
       (80, 'Tamil Nadu', 5),
       (81, 'Telangana', 5),
       (82, 'Tripura', 5),
       (83, 'Uttar Pradesh', 5),
       (84, 'Uttarakhand', 5),
       (85, 'West Bengal', 5),
       (86, 'Andaman and Nicobar Islands', 5),
       (87, 'Chandigarh', 5),
       (88, 'Dadra and Nagar Haveli', 5),
       (89, 'Daman & Diu', 5),
       (90, 'Lakshadweep', 5),
       (91, 'Puducherry', 5),
       (92, 'The Government of NCT of Delhi', 5),
       (93, 'Alabama', 7),
       (94, 'Alaska', 7),
       (95, 'Arizona', 7),
       (96, 'Arkansas', 7),
       (97, 'California', 7),
       (98, 'Colorado', 7),
       (99, 'Connecticut', 7),
       (100, 'Delaware', 7),
       (101, 'District Of Columbia', 7),
       (102, 'Florida', 7),
       (103, 'Georgia', 7),
       (104, 'Hawaii', 7),
       (105, 'Idaho', 7),
       (106, 'Illinois', 7),
       (107, 'Indiana', 7),
       (108, 'Iowa', 7),
       (109, 'Kansas', 7),
       (110, 'Kentucky', 7),
       (111, 'Louisiana', 7),
       (112, 'Maine', 7),
       (113, 'Maryland', 7),
       (114, 'Massachusetts', 7),
       (115, 'Michigan', 7),
       (116, 'Minnesota', 7),
       (117, 'Mississippi', 7),
       (118, 'Missouri', 7),
       (119, 'Montana', 7),
       (120, 'Nebraska', 7),
       (121, 'Nevada', 7),
       (122, 'New Hampshire', 7),
       (123, 'New Jersey', 7),
       (124, 'New Mexico', 7),
       (125, 'New York', 7),
       (126, 'North Carolina', 7),
       (127, 'North Dakota', 7),
       (128, 'Ohio', 7),
       (129, 'Oklahoma', 7),
       (130, 'Oregon', 7),
       (131, 'Pennsylvania', 7),
       (132, 'Rhode Island', 7),
       (133, 'South Carolina', 7),
       (134, 'South Dakota', 7),
       (135, 'Tennessee', 7),
       (136, 'Texas', 7),
       (137, 'Utah', 7),
       (138, 'Vermont', 7),
       (139, 'Virginia', 7),
       (140, 'Washington', 7),
       (141, 'West Virginia', 7),
       (142, 'Wisconsin', 7),
       (143, 'Wyoming', 7),
       (144, 'Adıyaman', 6),
       (145, 'Afyonkarahisar', 6),
       (146, 'Ağrı', 6),
       (147, 'Aksaray', 6),
       (148, 'Amasya', 6),
       (149, 'Ankara', 6),
       (150, 'Antalya', 6),
       (151, 'Ardahan', 6),
       (152, 'Artvin', 6),
       (153, 'Aydın', 6),
       (154, 'Balıkesir', 6),
       (155, 'Bartın', 6),
       (156, 'Batman', 6),
       (157, 'Bayburt', 6),
       (158, 'Bilecik', 6),
       (159, 'Bingöl', 6),
       (160, 'Bitlis', 6),
       (161, 'Bolu', 6),
       (162, 'Burdur', 6),
       (163, 'Bursa', 6),
       (164, 'Çanakkale', 6),
       (165, 'Çankırı', 6),
       (166, 'Çorum', 6),
       (167, 'Denizli', 6),
       (168, 'Diyarbakır', 6),
       (169, 'Düzce', 6),
       (170, 'Edirne', 6),
       (171, 'Elazığ', 6),
       (172, 'Erzincan', 6),
       (173, 'Erzurum', 6),
       (174, 'Eskişehir', 6),
       (175, 'Gaziantep', 6),
       (176, 'Giresun', 6),
       (177, 'Gümüşhane', 6),
       (178, 'Hakkâri', 6),
       (179, 'Hatay', 6),
       (180, 'Iğdır', 6),
       (181, 'Isparta', 6),
       (182, 'İstanbul', 6),
       (183, 'İzmir', 6),
       (184, 'Kahramanmaraş', 6),
       (185, 'Karabük', 6),
       (186, 'Karaman', 6),
       (187, 'Kars', 6),
       (188, 'Kastamonu', 6),
       (189, 'Kayseri', 6),
       (190, 'Kırıkkale', 6),
       (191, 'Kırklareli', 6),
       (192, 'Kırşehir', 6),
       (193, 'Kilis', 6),
       (194, 'Kocaeli', 6),
       (195, 'Konya', 6),
       (196, 'Kütahya', 6),
       (197, 'Malatya', 6),
       (198, 'Manisa', 6),
       (199, 'Mardin', 6),
       (200, 'Mersin', 6),
       (201, 'Muğla', 6),
       (202, 'Muş', 6),
       (203, 'Nevşehir', 6),
       (204, 'Niğde', 6),
       (205, 'Ordu', 6),
       (206, 'Osmaniye', 6),
       (207, 'Rize', 6),
       (208, 'Sakarya', 6),
       (209, 'Samsun', 6),
       (210, 'Siirt', 6),
       (211, 'Sinop', 6),
       (212, 'Sivas', 6),
       (213, 'Şanlıurfa', 6),
       (214, 'Şırnak', 6),
       (215, 'Tekirdağ', 6),
       (216, 'Tokat', 6),
       (217, 'Trabzon', 6),
       (218, 'Tunceli', 6),
       (219, 'Uşak', 6),
       (220, 'Van', 6),
       (221, 'Yalova', 6),
       (222, 'Yozgat', 6),
       (223, 'Zonguldak', 6),
       (224, 'Auvergne-Rhône-Alpes', 3),
       (225, 'Bourgogne-Franche-Comté', 3),
       (226, 'Bretagne', 3),
       (227, 'Centre', 3),
       (228, 'Corse', 3),
       (229, 'Grand Est', 3),
       (230, 'Hauts-De-France', 3),
       (231, 'Île-de-France', 3),
       (232, 'Normandie', 3),
       (233, 'Nouvelle-Aquitaine', 3),
       (234, 'Occitanie', 3),
       (235, 'Pays de la Loire', 3),
       (236, 'Provence-Alpes-Côte d''Azur', 3);

/*!40000 ALTER TABLE `state`
    ENABLE KEYS */;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
