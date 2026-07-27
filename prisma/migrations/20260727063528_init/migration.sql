-- CreateEnum
CREATE TYPE "Role" AS ENUM ('APTank', 'APCaster', 'APCarry', 'APReaper', 'APFighter', 'ADTank', 'ADFighter', 'ADCaster', 'ADSpecialist', 'ADReaper', 'ADCarry', 'HFighter', 'null');

-- CreateEnum
CREATE TYPE "Trait" AS ENUM ('NOVA', '길잡이', '도전자', '동물특공대', '메카', '복제자', '불한당', '선봉대', '습격자', '시간균열자', '싸움꾼', '암흑의별', '여행자', '요새', '우주그루브', '운명술사', '저격수', '전달자', '정령족', '중재자', '초능력', '최신상', '태고족', '구원자', '기동총격여신', '말살자', '보루', '신성결투가', '어둠의여인', '예언자', '은하계사냥꾼', '지휘관', '특성선택', '파멸자', '파티광', '별돌보미');

-- CreateTable
CREATE TABLE "Champion" (
    "id" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "traits" "Trait"[],
    "stat_1star" JSONB NOT NULL,
    "stat_2star" JSONB NOT NULL,
    "stat_3star" JSONB NOT NULL,
    "ability" JSONB NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);
