import React, { useState, useEffect } from "react";
import Container from "@/component/Container";
import NullData from "@/component/NullData";
import ReportForm from "./ReportForm";
import getCreatorUserId from "@/app/action/getCreatorUserId";
import { Product, User } from "@prisma/client";

interface ReportDetailsProps {
    params: {reportproductId: string};
}

const Report: React.FC<ReportDetailsProps> = async({ params }: ReportDetailsProps) => {
    console.log(params.reportproductId)
    // const userId = await getCreatorUserId(params.reportproductId);
    const userId = params.reportproductId
    console.log(userId)
    return (
        <div className="p-8">
            <Container>
                {userId ? (
                    <ReportForm productId={userId} />
                ) : (
                    <NullData title="ไม่มีไอหน้าส้นตีน" />
                )}
            </Container>
        </div>
    );
}

export default Report;
