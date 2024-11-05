/*
  Warnings:

  - The values [남성,여성] on the enum `signup_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `signup` MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL;
